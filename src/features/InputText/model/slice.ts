import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { configureStroke } from "../lib/configureStroke";
import { generateText } from "../lib/generateText";
import { ConfigText } from "@/features/ConfigureText/model";
import { TextInputConfig } from "./types";
import { IWordsResponce } from "shared/types/ResponceTypes";

interface IInputTextClikClikProps {
  inputText: TextInputConfig[];
  letterCounter: number;
  typos: number;
  inputTextLength: number;
  isEndLine: boolean;
  arrayWords: string[];
  arraySentences: string[];
  speedArray: number[],
  accuracy: number,
}

const initialState: IInputTextClikClikProps = {
  inputText: [],
  letterCounter: 0,
  typos: 0,
  inputTextLength: 0,
  isEndLine: false,
  arrayWords: [],
  arraySentences: [],
  speedArray: [],
  accuracy: 100,
};

const InputTextSlice = createSlice({
  name: "InputTextClikClik",
  initialState,
  reducers: {
    updateLastLetterForward(state) {
      const { inputText } = state;
      const lastLetter: TextInputConfig = inputText.find(
        (elem) => elem.isSelected === true
      );
      inputText[inputText.indexOf(lastLetter)].isSelected = false;
      inputText[inputText.indexOf(lastLetter)].correctlyPressed = true;

      inputText[inputText.indexOf(lastLetter) + 1].isSelected = true;
    },
    updateLastLetterBackward(state) {
      const { inputText } = state;
      const lastLetter: TextInputConfig = inputText.find(
        (elem) => elem.isSelected === true
      );
      inputText[inputText.indexOf(lastLetter)].isSelected = false;

      inputText[inputText.indexOf(lastLetter) - 1] = {
        ...inputText[inputText.indexOf(lastLetter) - 1],
        isSelected: true,
        correctlyPressed: false,
        typoPressed: false,
      };
    },
    updateTextInput(
      state,
      config: PayloadAction<{
        config: ConfigText;
        symbols: string[];
      }>
    ) {
      const text = configureStroke(
        generateText(config.payload.config, config.payload.symbols, state.arrayWords)
      );
      text[0].isSelected = true;
      state.inputText = text;
      state.isEndLine = false;

      state.typos = 0;
      state.inputText = state.inputText.map((elem) => {
        elem.isTypo = false;
        return elem;
      });
    },
    initTypo(state) {
      const { inputText } = state;
      const lastLetter: TextInputConfig = inputText.find(
        (elem) => elem.isSelected === true
      );
      if (inputText.indexOf(lastLetter) !== inputText.length - 1) {
        inputText[inputText.indexOf(lastLetter)].isSelected = false;
        inputText[inputText.indexOf(lastLetter)].typoPressed = true;
        inputText[inputText.indexOf(lastLetter)].isTypo = true;
        inputText[inputText.indexOf(lastLetter)].correctlyPressed = false;
        inputText[inputText.indexOf(lastLetter) + 1].isSelected = true;
      } else {
        inputText[inputText.indexOf(lastLetter)].typoPressed = true;
        inputText[inputText.indexOf(lastLetter)].isTypo = true;
        inputText[inputText.indexOf(lastLetter)].isSelected = false;
        state.isEndLine = true;
      }
    },
    addLetterCounter(state) {
      state.letterCounter++;
    },
    clearLetterCounter(state) {
      state.letterCounter = 0;
    },
    addTypos(state) {
      state.typos++;
    },
    setEndStroke(state) {
      const { inputText } = state;
      const lastLetter: TextInputConfig = inputText.find(
        (elem) => elem.isSelected === true
      );
      inputText[inputText.indexOf(lastLetter)] = {
        ...inputText[inputText.indexOf(lastLetter)],
        isSelected: false,
        correctlyPressed: true,
      };
      state.isEndLine = true;
    },
    queryWords(state, action: PayloadAction<IWordsResponce>) {
      if (action.payload === undefined) {
        state.arrayWords = [];
        state.arraySentences = [];
        state.inputText = [];
      } else {
        state.arrayWords = action.payload.words;
        state.arraySentences = action.payload.sentences;
      }
    },
    updateSpeed(state, action: PayloadAction<number>) {
      state.speedArray = [...state.speedArray, action.payload];
    },
    updateAccuracy(state, action: PayloadAction<TextInputConfig[]>) {
      const inputText = action.payload;
      const lenght = inputText.reduce((accumulator, currentValue) => {
        if (currentValue.correctlyPressed === true || currentValue.typoPressed === true) {
          return accumulator + 1;
        } else {
          return accumulator;
        }
      }, 0);

      const typos = inputText.reduce((accumulator, currentValue) => {
        if (currentValue.typoPressed === true) {
          return accumulator + 1;
        } else {
          return accumulator;
        }
      }, 0);

      if (lenght !== 0) {
        state.accuracy = Math.floor(((lenght - typos) / lenght) * 100);
      }
    },
    clearSpeed(state) {
      state.speedArray = [];
    },
    clearAccuracy(state) {
      state.accuracy = 100;
    },
  }
  });

export const {
  updateLastLetterForward,
  updateLastLetterBackward,
  updateTextInput,
  addLetterCounter,
  clearLetterCounter,
  addTypos,
  initTypo,
  setEndStroke,
  queryWords,
  updateSpeed, updateAccuracy, clearSpeed, clearAccuracy
} = InputTextSlice.actions;

export const InputTextReducer = InputTextSlice.reducer;
