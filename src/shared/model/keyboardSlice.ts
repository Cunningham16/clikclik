import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TextInputConfig } from "shared/types/TextInputConfig";
import { IKeyConfigClik } from "shared/types/IKeyConfigClik";
import { KeyboardCases } from "shared/types/KeyboardConfiguration";

import { createPriorArray } from "shared/lib/createPriorArray";
import { setErrorKey } from "shared/lib/setErrorKey";
import { setSelectedKey } from "shared/lib/setSelectedKey";
import { setPriorErrorKeys } from "shared/lib/setPriorErrorKeys";
import { clearErrorKey } from "shared/lib/clearErrorKey";
import { IKeyboardResponce } from "shared/types/ResponceTypes";

interface KeyboardState {
  keysCases: KeyboardCases | undefined;
  keyList: IKeyConfigClik[] | undefined;
  letterTypo: string;
  counterTypo: number;
  arrayTypo: string[];
}

const initialState: KeyboardState = {
  keysCases: undefined,
  keyList: undefined,
  letterTypo: "",
  counterTypo: 0,
  arrayTypo: [],
};

export const keyboardSlice = createSlice({
  name: "InteractiveKeyboard",
  initialState,
  reducers: {
    showErrorKey(state, action: PayloadAction<string>) {
      state.keyList = setErrorKey(state.keyList, action.payload, state.keysCases);
    },
    showSelectedKey(state, action: PayloadAction<string>) {
      state.keyList = setSelectedKey(state.keysCases, action.payload, state.keyList);
    },
    returnKeyList(state, action: PayloadAction<string>) {
      state.keyList = clearErrorKey(state.keyList, action.payload, state.keysCases);
    },
    setLetterTypo(state, action: PayloadAction<string>) {
      state.letterTypo = action.payload;
      state.counterTypo = state.counterTypo + 1;
    },
    setPriorityTypoKeys(state, inputText: PayloadAction<TextInputConfig[]>) {
      let priorArray = createPriorArray(inputText.payload);

      for (let elem of priorArray) {
        state.keyList = setPriorErrorKeys(
          elem.content,
          elem.priority,
          state.keyList,
          state.keysCases
        );
      }
    },
    setArrayTypos(state, action: PayloadAction<string>) {
      state.arrayTypo = [...state.arrayTypo, action.payload];
    },
    clearTypoKeyboard(state) {
      state.keyList = state.keyList.map((elem) => {
        elem.errorPriority = 0;
        return elem;
      });
      state.arrayTypo = [];
    },
    clearSelectedKeys(state) {
      state.keyList = state.keyList.map((elem) => {
        elem.selected = false;
        return elem;
      });
    },
    queryKeyboard(state, data: PayloadAction<IKeyboardResponce | undefined>) {
      if (data.payload === undefined) {
        state.keyList = undefined;
        state.keysCases = undefined;
      } else {
        state.keyList = data.payload.keyList;
        state.keysCases = data.payload.keyCases;
      }
    }
  },
});

export const {
  showErrorKey,
  returnKeyList,
  setLetterTypo,
  showSelectedKey,
  setPriorityTypoKeys,
  clearTypoKeyboard,
  setArrayTypos,
  clearSelectedKeys,
  queryKeyboard,
} = keyboardSlice.actions;

export const keyboardReducer = keyboardSlice.reducer;
