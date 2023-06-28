import { createSlice } from "@reduxjs/toolkit";

type ConfigKeyboard = {
    isSoundError: boolean,
    keyHints: boolean,
}

interface ConfigKeyboardState {
    configurationKeyboard: ConfigKeyboard;
}

const initialState: ConfigKeyboardState = {
    configurationKeyboard: {
        isSoundError: false,
        keyHints: true,
    },
}

const configKeyboardSlice = createSlice({
    name: "sidebarKeyboardConfig",
    initialState,
    reducers: {
        toggleShowHints(state) {
            state.configurationKeyboard.keyHints = !state.configurationKeyboard.keyHints;
        },
        toggleSoundError(state) {
          state.configurationKeyboard.isSoundError = !state.configurationKeyboard.isSoundError;
        },
    }
})

export const {
    toggleShowHints,
    toggleSoundError,
  } = configKeyboardSlice.actions;
  
  export const configKeyboardReducer = configKeyboardSlice.reducer;