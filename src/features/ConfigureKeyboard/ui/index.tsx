import { useAppDispatch, useAppSelector } from "@/shared/model"
import Checkbox from "@/shared/ui/CheckboxIOS"
import { ConfigList } from "@/shared/ui/ConfigList"
import { ConfigSection } from "@/shared/ui/ConfigSection"
import { toggleShowHints, toggleSoundError } from "../model"

export const ConfigureKeyboard = () => {
    const dispatch = useAppDispatch()
    const {configurationKeyboard} = useAppSelector(state => state.configKeyboardReducer)

    const checkboxHints = () => {
      dispatch(toggleShowHints());
    };

    const checkboxSound = () => {
      dispatch(toggleSoundError());
    };

    return(
        <ConfigList placeholder="ADD TO THE LESSON">
            <ConfigSection placeholder="Show hints">
                <Checkbox checked={configurationKeyboard.keyHints} onClick={checkboxHints} />
            </ConfigSection>
            <ConfigSection placeholder="Add sound of error?">
                <Checkbox checked={configurationKeyboard.isSoundError} onClick={checkboxSound} />
            </ConfigSection>
        </ConfigList>
    )
}