import React, { useState } from "react";
import { ButtonKey } from "@/entities/ButtonKey/ui";
import { useCallback, useEffect, memo } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { TextInputConfig } from "@/features/InputText/model";
import { useSound } from "use-sound";
import {
  clearSelectedKeys,
  clearTypoKeyboard,
  returnKeyList,
  selectEnter,
  setPriorityTypoKeys,
  showErrorKey,
  showSelectedKey,
} from "@/shared/model/keyboardSlice";
import styles from "./styles.module.scss";
import audio_alert from "shared/assets/audio/tindeck_1.mp3";
import { setSelectedEnter } from "@/shared/lib/setSelectedEnter";

export const Keyboard = memo(() => {
  const { keyList, letterTypo, counterTypo } = useAppSelector(
    (state) => state.keyboardReducer
  );
  const { inputText, isEndLine } = useAppSelector(
    (state) => state.InputTextReducer
  );
  const { configurationKeyboard } = useAppSelector((state) => state.configKeyboardReducer);
  const {configurationText} = useAppSelector((state) => state.configTextReducer)
  const [isVisibleHints, setIsVisible] = useState(true);
  const [playAlert] = useSound(audio_alert);

  const dispatch = useAppDispatch();

  const setErrorKey = useCallback(() => {
    if (configurationKeyboard.isSoundError) {
      playAlert();
    }

    if (!isEndLine) {
      dispatch(showErrorKey(letterTypo));
      setTimeout(() => {
        dispatch(returnKeyList(letterTypo));
      }, 5000);
    }
  }, [letterTypo, counterTypo]);

  const selectLetter = useCallback(() => {
    if (isVisibleHints && !isEndLine) {
      const lastLetter: TextInputConfig = inputText?.find(
        (elem) => elem.isSelected === true
      );
      dispatch(showSelectedKey(lastLetter.content));
    }

    if (isEndLine) {
      dispatch(selectEnter());
    }

    if (!isVisibleHints && !isEndLine) {
      dispatch(clearSelectedKeys());
    }
  }, [inputText, isVisibleHints]);

  useEffect(() => {
    setIsVisible(configurationKeyboard.keyHints);
  }, [configurationKeyboard.keyHints]);

  useEffect(() => {
    selectLetter();
  }, [selectLetter]);

  useEffect(() => {
    setErrorKey();
  }, [setErrorKey]);

  useEffect(() => {
    if (isEndLine) {
      dispatch(setPriorityTypoKeys(inputText));
    } else {
      dispatch(clearTypoKeyboard());
    }
  }, [isEndLine]);

  let array = []

  return (
    <div className={styles.keyboard}>
      {keyList?.map((elem) => {
        if(elem.type === "arrow-top" || elem.type === "arrow-bottom"){
          array = [...array, elem]
          if(array.length === 2){
            return (
              <div className={styles.arrows_container}>
                <ButtonKey configKey={array[0]} configText={configurationText}/>
                <ButtonKey configKey={array[1]} configText={configurationText}/>
              </div>
            )
          }
        }else{
          return (
            <ButtonKey configKey={elem} configText={configurationText}/>
          )
        }
      })}
    </div>
  );
});