import { useAppDispatch, useAppSelector } from "@/shared/model"
import Checkbox from "@/shared/ui/CheckboxIOS"
import { ConfigList } from "@/shared/ui/ConfigList"
import { ConfigSection } from "@/shared/ui/ConfigSection"
import { toggleCapitalLetters, toggleNumbers, togglePunctuation } from "../model"
import {
  updateTextInput,
  clearAccuracy,
  clearSpeed,
} from "@/features/InputText/model";
import { useCallback } from "react"

export const ConfigureText = () => {
  const { keysCases } = useAppSelector((state) => state.keyboardReducer);
    const dispatch = useAppDispatch()
    const {configurationText} = useAppSelector(state => state.configTextReducer)

    const checkboxPunctuation = () => {
      dispatch(togglePunctuation());
      dispatch(
        updateTextInput({
          config: {isNumbers: configurationText.isNumbers, isCapitalLetters: configurationText.isCapitalLetters, isPunctuation: !configurationText.isPunctuation},
          symbols: keysCases.symbols,
        })
      );
      resetText()
    };

    const checkboxCapital = () => {
      dispatch(toggleCapitalLetters());
      dispatch(
        updateTextInput({
          config: {isNumbers: configurationText.isNumbers, isCapitalLetters: !configurationText.isCapitalLetters, isPunctuation: configurationText.isPunctuation},
          symbols: keysCases.symbols,
        })
      );
      resetText()
    };

    const checkboxNumbers = () => {
      dispatch(toggleNumbers());
      dispatch(
        updateTextInput({
          config: {isNumbers: !configurationText.isNumbers, isCapitalLetters: configurationText.isCapitalLetters, isPunctuation: configurationText.isPunctuation},
          symbols: keysCases.symbols,
        })
      );
      resetText()
    };

    const resetText = () => {
      dispatch(clearAccuracy());
      dispatch(clearSpeed());
    }
    
    return(
        <ConfigList placeholder="ADD TO THE LESSON">
            <ConfigSection placeholder="Capital letters">
                <Checkbox checked={configurationText.isCapitalLetters} onClick={checkboxCapital} />
            </ConfigSection>
            <ConfigSection placeholder="Punctuation">
                <Checkbox checked={configurationText.isPunctuation} onClick={checkboxPunctuation} />
            </ConfigSection>
            <ConfigSection placeholder="Numbers">
                <Checkbox checked={configurationText.isNumbers} onClick={checkboxNumbers} />
            </ConfigSection>
        </ConfigList>
    )
}