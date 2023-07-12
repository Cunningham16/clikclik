import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "shared/model";
import {
  updateTextInput,
  addTypos,
  addLetterCounter,
  clearLetterCounter,
  updateLastLetterForward,
  initTypo,
  updateLastLetterBackward,
  setEndStroke,
  clearAccuracy,
  clearSpeed,
  updateAccuracy,
  updateSpeed
} from "../model";

import { usePressedKey } from "../model";
import { setArrayTypos, setLetterTypo,  } from "@/shared/model/keyboardSlice";

import styles from "./styles.module.scss";

import { TextInputConfig } from "../model";

function configureSpanOnEnd(config: TextInputConfig) {
  if (config.isSelected) {
    return <span className={styles.last_letter}>{config.content}</span>;
  } else if (config.correctlyPressed && !config.isTypo) {
    return <span className={styles.complete_text}>{config.content}</span>;
  } else if (config.isTypo) {
    return <span className={styles.error}>{config.content}</span>;
  } else {
    return <span className={styles.text_input}>{config.content}</span>;
  }
}

function configureSpan(config: TextInputConfig) {
  if (config.isSelected) {
    return <span className={styles.last_letter}>{config.content}</span>;
  } else if (config.typoPressed) {
    return <span className={styles.error}>{config.content}</span>;
  } else if (config.correctlyPressed) {
    return <span className={styles.complete_text}>{config.content}</span>;
  } else {
    return <span className={styles.text_input}>{config.content}</span>;
  }
}

export const InputText: FC = () => {
  const { inputText, letterCounter, inputTextLength, isEndLine } = useAppSelector(
    (state) => state.InputTextReducer
  );
  const { configurationText } = useAppSelector((state) => state.configTextReducer);
  const { keysCases } = useAppSelector((state) => state.keyboardReducer);
  const dispatch = useAppDispatch();

  const [inputLetter, counterInput] = usePressedKey();

  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [intervalCounter, setIntervalCounter] = useState(0);

  useEffect(() => {
    const start = setInterval(() => {
      setIntervalCounter((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(start);
    };
  }, []);

  useEffect(() => {
    if (isStarted) {
      dispatch(updateSpeed(letterCounter));
      dispatch(clearLetterCounter());
    }
  }, [intervalCounter]);

  const lastLetter: TextInputConfig = inputText?.find(
    (elem) => elem.isSelected === true
  );

  const errorHandler = (inputLetter: string) => {
    if (
      inputLetter !== "ShiftLeft" &&
      inputLetter !== "ShiftRight" &&
      inputLetter !== "" &&
      inputLetter !== null &&
      inputLetter !== "Backspace"
    ) {
      dispatch(addTypos());
      dispatch(initTypo());
      dispatch(setLetterTypo(inputLetter));
    }
  };

  useEffect(() => {
    if (
      inputLetter === "Backspace" &&
      isEndLine === false &&
      inputText?.indexOf(lastLetter) !== 0
    ) {
      dispatch(updateLastLetterBackward());
      dispatch(updateAccuracy(inputText));
    }

    if (
      lastLetter !== undefined &&
      inputLetter === lastLetter.content &&
      inputText?.indexOf(lastLetter) !== inputText.length - 1 &&
      isEndLine === false
    ) {
      dispatch(updateLastLetterForward());
      setIsStarted(true);
      dispatch(addLetterCounter());
      dispatch(updateAccuracy(inputText));
    }

    if (
      lastLetter !== undefined &&
      inputLetter === lastLetter.content &&
      inputText?.indexOf(lastLetter) === inputText.length - 1 &&
      isEndLine === false
    ) {
      dispatch(setEndStroke());
      setIsStarted(false);
      dispatch(updateAccuracy(inputText));
    }

    if (
      lastLetter !== undefined &&
      inputLetter !== lastLetter.content &&
      inputText?.indexOf(lastLetter) !== inputTextLength - 1 &&
      isEndLine === false
    ) {
      dispatch(setArrayTypos(lastLetter.content));
      errorHandler(inputLetter);
    }

    if (
      lastLetter !== undefined &&
      inputLetter !== "ShiftLeft" &&
      inputLetter !== "ShiftRight" &&
      inputLetter !== "" &&
      inputLetter !== null &&
      inputLetter !== "Backspace" &&
      inputText?.indexOf(lastLetter) === inputTextLength - 1
    ) {
      dispatch(setEndStroke());
      setIsStarted(false);
    }

    if (inputLetter === "Enter" && isEndLine === true) {
      dispatch(
        updateTextInput({
          config: configurationText,
          symbols: keysCases.symbols,
        })
      );
      dispatch(clearAccuracy());
      dispatch(clearSpeed());
    }
  }, [inputLetter, counterInput]);

  return (
    <div className={styles.container}>
      {inputText === undefined ? (
        <h1>Please, wait</h1>
      ) : isEndLine ? (
        inputText.map((elem) => configureSpanOnEnd(elem))
      ) : (
        inputText.map((elem) => configureSpan(elem))
      )}
    </div>
  );
};