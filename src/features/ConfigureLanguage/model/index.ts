import { TrainingLanguages } from "@/shared/types/TrainingLanguages";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfigLanguageState {
    currentLanguage: TrainingLanguages;
}

const initialState: ConfigLanguageState = {
    currentLanguage: TrainingLanguages.RU
}

const configLanguageSlice = createSlice({
    name: "sidebarLanguageConfig",
    initialState,
    reducers: {
        setLanguage(state, action: PayloadAction<TrainingLanguages>) {
          state.currentLanguage = action.payload;
        },
    }
})

export const {
    setLanguage,
  } = configLanguageSlice.actions;
  
  export const configLanguageReducer = configLanguageSlice.reducer;