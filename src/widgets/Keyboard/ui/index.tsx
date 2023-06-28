import { useState } from "react";
import { ButtonKey } from "@/entities/ButtonKey/ui";
import { useCallback, useEffect, memo } from "react";
import { useAppDispatch, useAppSelector } from "shared/model/hooks";
import { TextInputConfig } from "@/features/InputText/model";
import { useSound } from "use-sound";
import {
  clearSelectedKeys,
  clearTypoKeyboard,
  returnKeyList,
  setPriorityTypoKeys,
  showErrorKey,
  showSelectedKey,
} from "shared/model/keyboardSlice";
import styles from "./styles.module.scss";
import audio_alert from "shared/assets/audio/tindeck_1.mp3";

export const Keyboard = memo(() => {
  const { keyList, letterTypo, counterTypo } = useAppSelector(
    (state) => state.keyboardReducer
  );
  const { inputText, isEndLine } = useAppSelector(
    (state) => state.InputTextReducer
  );
  const { configurationKeyboard } = useAppSelector((state) => state.configKeyboardReducer);
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
      dispatch(showSelectedKey("Enter"));
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

  return (
    <div className={styles.keyboard}>
      {keyList?.map((elem) => (
        <ButtonKey config={elem} />
      ))}
    </div>
  );
});