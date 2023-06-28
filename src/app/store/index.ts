import { configureStore } from "@reduxjs/toolkit";
import {configTextReducer} from "@/features/ConfigureText/model"
import { InputTextReducer } from "@/features/InputText";
import { configKeyboardReducer } from "@/features/ConfigureKeyboard/model";
import { configLanguageReducer } from "@/features/ConfigureLanguage/model";
import { sidebarReducer } from "@/features/SettingsButton/model";
import { keyboardReducer } from "@/shared/model/keyboardSlice";
import { keyTrainerApi } from "@/shared/api/RTKService";

export const store = configureStore({
    reducer: {
        configTextReducer,
        InputTextReducer,
        configKeyboardReducer,
        configLanguageReducer,
        sidebarReducer,
        keyboardReducer,
        [keyTrainerApi.reducerPath]: keyTrainerApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(keyTrainerApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;