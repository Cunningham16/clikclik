import { useState, useEffect, FC, useCallback, memo } from "react";
import { KeyConfig } from "shared/types/KeyConfig";
import { renderDefault } from "../lib/renderKey";
import styles from "./styles.module.scss";

type buttonKeyInterface = {
  config: KeyConfig;
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

export const ButtonKey: FC<buttonKeyInterface> = memo(({ config }) => {
  const [style, setClass] = useState("");
  const { selected, setType, content1, content2, errorPressed, errorPriority } = config;

  const [styleError, setStyleError] = useState<string>(`${styles.error_default}`);

  const setError = useCallback(() => {
    if (errorPressed) {
      setStyleError(`${styles.error_active}`);
    } else {
      setStyleError(`${styles.error_default}`);
    }
  }, [errorPressed]);

  useEffect(() => {
    setError();
  }, [setError]);

  const setSelected = useCallback(() => {
    if (selected === true) {
      setClass(renderDefault(setType) + ` ${styles.active_default}`);
    } else {
      setClass(renderDefault(setType));
    }
  }, [selected, setType]);

  useEffect(() => {
    setSelected();
  }, [setSelected]);

  const setPriority = useCallback(() => {
    switch (errorPriority) {
      case 1:
        return setClass(renderDefault(setType) + ` ${styles.error_1prior}`);
      case 2:
        return setClass(renderDefault(setType) + ` ${styles.error_2prior}`);
      case 3:
        return setClass(renderDefault(setType) + ` ${styles.error_3prior}`);
      default:
        return setClass(renderDefault(setType));
    }
  }, [errorPriority, setType]);

  useEffect(() => {
    setPriority();
  }, [setPriority]);

  return (
    <div className={styles.button_container}>
      <div className={style}>{renderContentKey(content1, content2)}</div>
      <div className={styleError}></div>
    </div>
  );
});
