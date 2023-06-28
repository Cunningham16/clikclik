import { useAppDispatch, useAppSelector } from "@/shared/model"
import { ConfigList } from "@/shared/ui/ConfigList"
import { ConfigSection } from "@/shared/ui/ConfigSection"
import { setLanguage } from "../model"
import russianFlag from "shared/assets/img/russia.png";
import englishFlag from "shared/assets/img/united-kingdom.png";
import { TrainingLanguages } from "@/shared/types/TrainingLanguages"
import DropdownLanguage from "@/shared/ui/DropdownLanguage"

const arrayLang = [
  { language: TrainingLanguages.RU, img: russianFlag },
  { language: TrainingLanguages.EN, img: englishFlag },
];

export const ConfigureLanguage = () => {
    const dispatch = useAppDispatch()
    const {currentLanguage} = useAppSelector(state => state.configLanguageReducer)

    const changeLanguage = (language: TrainingLanguages) => {
      dispatch(setLanguage(language));
    };
    
    return(
        <ConfigList placeholder="SETTINGS">
            <ConfigSection placeholder="Language">
              <DropdownLanguage languagesArray={arrayLang} currentLanguage={currentLanguage} changeLanguage={changeLanguage}/>
            </ConfigSection>
        </ConfigList>
    )
}