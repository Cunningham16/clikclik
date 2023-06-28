import { useAppDispatch, useAppSelector } from "@/shared/model"
import Checkbox from "@/shared/ui/CheckboxIOS"
import { ConfigList } from "@/shared/ui/ConfigList"
import { ConfigSection } from "@/shared/ui/ConfigSection"
import { toggleCapitalLetters, toggleNumbers, togglePunctuation } from "../model"

export const ConfigureText = () => {
    const dispatch = useAppDispatch()
    const {configurationText} = useAppSelector(state => state.configTextReducer)

    const checkboxPunctuation = () => {
      dispatch(togglePunctuation());
    };

    const checkboxCapital = () => {
      dispatch(toggleCapitalLetters());
    };

    const checkboxNumbers = () => {
      dispatch(toggleNumbers());
    };
    
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