import React, { useState } from "react";
import {queryWords, updateTextInput} from "@/features/InputText/";

import { queryKeyboard } from "shared/model/keyboardSlice";
import { useAppDispatch, useAppSelector } from "shared/model/hooks";
import { InputText } from "@/features/InputText";
import { Loader } from "shared/ui/Loader";
import { Keyboard } from "@/widgets/Keyboard/ui";

export const LoaderComponent = () => {
    const { configurationText } = useAppSelector(
      (state) => state.configTextReducer
    );
    const { currentLanguage } = useAppSelector(
      (state) => state.configLanguageReducer
    );
    const dispatch = useAppDispatch();

    const [isLoad, setIsLoad] = useState(true)

    const request = async () => {
      setIsLoad(true)
      const keyboard = await import(`../../shared/assets/json/keyboard-${currentLanguage}.json`)
      const words = await import(`../../shared/assets/json/words-${currentLanguage}.json`)
      dispatch(queryWords(words.default))
      dispatch(updateTextInput({
        config: configurationText,
        symbols: keyboard.default.keyCases.symbols
      }))
      dispatch(queryKeyboard(keyboard.default))
      setIsLoad(false)
    }

    React.useEffect(() => {
      request()
    }, [currentLanguage])

    return (
        <>
        {isLoad ? (
        <Loader size="normal"/>
      ) : (
        <div>
          <InputText />
          <Keyboard />
        </div>
      )} 
        </>
    )
}