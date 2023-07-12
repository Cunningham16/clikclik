import { KeyConfig, KeyboardCases } from "./KeyConfig";
import { TrainingLanguages } from "./TrainingLanguages";

export interface IWordsResponce{
    id: number;
    language: TrainingLanguages;
    words: string[];
    sentences: string[];
}

export interface IKeyboardResponce{
    id: number;
    language: TrainingLanguages;
    keyList: KeyConfig[];
    keyCases: KeyboardCases
}