import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IKeyConfigClik } from "shared/types/IKeyConfigClik";
import { KeyboardCases } from "shared/types/KeyboardConfiguration";
import { TrainingLanguage } from "shared/types/TrainConfig";

export interface KeyboardResponce {
  id: number;
  language: TrainingLanguage;
  keyList: IKeyConfigClik[];
  keyCases: KeyboardCases;
}

export interface WordsResponce {
  id: number;
  language: TrainingLanguage;
  words: string[];
  sentences: string[];
}

export const keyTrainerApi = createApi({
  reducerPath: "keyTrainerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6447c33150c25337442e3750.mockapi.io",
  }),
  endpoints: (builder) => ({
    getKeyboardByLanguage: builder.query<KeyboardResponce[], string>({
      query: (name) => ({
        url: `/keyboards?language=${name}`,
      }),
    }),
    getWords: builder.query<WordsResponce[], string>({
      query: (name) => ({
        url: `/words?language=${name}`,
      }),
    }),
  }),
});

export const { useGetKeyboardByLanguageQuery, useGetWordsQuery } = keyTrainerApi;
