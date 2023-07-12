import { configureStore } from "@reduxjs/toolkit";
import {configTextReducer} from "@/features/ConfigureText/model"
import { InputTextReducer } from "@/features/InputText";
import { configKeyboardReducer } from "@/features/ConfigureKeyboard/model";
import { configLanguageReducer } from "@/features/ConfigureLanguage/model";
import { sidebarReducer } from "@/features/SettingsButton/model";
import { keyboardReducer } from "@/shared/model/keyboardSlice";

export const store = configureStore({
    reducer: {
        configTextReducer,
        InputTextReducer,
        configKeyboardReducer,
        configLanguageReducer,
        sidebarReducer,
        keyboardReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;