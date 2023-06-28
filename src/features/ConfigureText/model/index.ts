import { createSlice } from "@reduxjs/toolkit";

export type ConfigText = {
    isCapitalLetters: boolean;
    isNumbers: boolean;
    isPunctuation: boolean;
}

interface ConfigTextState {
    configurationText: ConfigText;
}

const initialState: ConfigTextState = {
    configurationText: {
      isCapitalLetters: false,
      isNumbers: false,
      isPunctuation: false,
    },
}

const configTextSlice = createSlice({
    name: "sidebarTextConfig",
    initialState,
    reducers: {
        toggleCapitalLetters(state) {
          state.configurationText.isCapitalLetters = !state.configurationText.isCapitalLetters;
        },
        toggleNumbers(state) {
          state.configurationText.isNumbers = !state.configurationText.isNumbers;
        },
        togglePunctuation(state) {
          state.configurationText.isPunctuation = !state.configurationText.isPunctuation;
        },
    }
})

export const {
    toggleCapitalLetters,
    toggleNumbers,
    togglePunctuation,
  } = configTextSlice.actions;
  
  export const configTextReducer = configTextSlice.reducer;