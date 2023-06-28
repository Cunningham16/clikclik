import styles from "./styles.module.scss";
import { TrainingLanguages } from "@/shared/types/TrainingLanguages";
import AnimateHeight from "react-animate-height";
import { useState } from "react";

interface Props {
    languagesArray: {
      language: TrainingLanguages;
      img: string;
    }[],
    currentLanguage: TrainingLanguages
    changeLanguage: (language: TrainingLanguages) => void
}

const DropdownLanguage = (props: Props) => {
  const [height, setHeight] = useState<"auto" | number>(0);

  const currentObject = props.languagesArray.find(elem => elem.language === props.currentLanguage)
  const toggleDropdown = () => {
    return setHeight(height === 0 ? "auto" : 0);
  };

  const selectLang = (elem: {language: TrainingLanguages, img: string}) => {
    props.changeLanguage(elem.language)
    setHeight(height === 0 ? "auto" : 0);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.major_section}
        aria-controls="open_dropdown_content"
        aria-expanded={height !== 0}
        onClick={toggleDropdown}
      >
        <img src={currentObject?.img} alt="" />
        <p>{currentObject?.language}</p>
      </button>

      <div className={styles.hiddenContent}>
        <AnimateHeight id="open_dropdown_content" duration={300} height={height}>
          {props.languagesArray.map((elem) => (
            <button
              className={`${styles.hiddenContent_section} ${
                currentObject?.language === elem.language && styles.section_active
              }`}
              onClick={() => {
                selectLang(elem);
              }}
            >
              {currentObject?.language === elem.language && <p className={styles.check}>✓</p>}
              <img src={elem.img} alt="" />
              <p>{elem.language}</p>
            </button>
          ))}
        </AnimateHeight>
      </div>
    </div>
  );
};

export default DropdownLanguage;
