import { FC, memo, useMemo } from "react";
import { KeyConfig, SpecificContentKey } from "@/shared/types/KeyConfig";
import { renderKey } from "../lib/renderKey";
import styles from "./styles.module.scss";
import { ConfigText } from "@/features/ConfigureText/model";

interface Props {
  configKey: KeyConfig;
  configText: ConfigText;
};

function renderContentKey(content1: string, content2: string | undefined) {
  if (content2 !== undefined) {
    return (
      <section>
        <p>{content1}</p>
        <sup>{content2}</sup>
      </section>
    );
  } else if (content2 === undefined) {
    return (
      <section>
        <p>{content1}</p>
      </section>
    );
  }
}

export const ButtonKey: FC<Props> = memo(({ configKey, configText }) => {
  const { selected, type, content1, content2, errorPressed, errorPriority, highlighted, specific } = configKey;

  const style = useMemo(() => {
      if (selected) {
        return `${renderKey(type)} ${styles.selected_default}`;
      } 
  
      if(errorPriority !== 0){
        return `${renderKey(type)} ${styles[`error_${errorPriority}prior`]}`;
      }
  
      return renderKey(type);  
  }, [selected, errorPriority])

  const styleActive = useMemo(() => {
    if(specific.content1 === SpecificContentKey.SYSTEM){
      return styles.active_with_symbols
    }

    if(specific.content1 === SpecificContentKey.LETTER){
      return `${styles.active_with_symbols} ${styles.key_letter}`
    }

    if(configText.isNumbers && configText.isPunctuation){
      return styles.active_with_symbols
    }

    if(configText.isNumbers && !configText.isPunctuation && specific.content1 !== SpecificContentKey.SYMBOL){
      return styles.active_without_symbols
    }

    if(configText.isNumbers && !configText.isPunctuation && specific.content1 === SpecificContentKey.SYMBOL){
      return styles.unactive_with_symbols
    }

    if(specific.content1 === SpecificContentKey.SYMBOL && configText.isPunctuation){
      return styles.active_with_symbols
    }

    if(configText.isPunctuation && !configText.isNumbers){
      return styles.unactive_without_symbols
    }

    if(!configText.isPunctuation && !configText.isNumbers){
      return styles.unactive_with_symbols
    }
  }, [configText])

  const styleError = errorPressed ? styles.error_active : styles.error_default
  const styleHighlighted = highlighted ? styles.highlighted : styles.unhighlighted

  return (
    <div className={styles.button_container}>
      <div className={`${style} ${styleActive} ${styleHighlighted}`}>{renderContentKey(content1, content2)}</div>
      <div className={styleError}></div>
    </div>
  );
});
