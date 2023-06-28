import React from "react";
import { Header } from "widgets/Header/ui";
import {queryWords, updateTextInput} from "@/features/InputText/";
import { Keyboard } from "@/widgets/Keyboard/ui";
import styles from "./styles.module.scss";
import { queryKeyboard } from "shared/model/keyboardSlice";
import { useGetKeyboardByLanguageQuery, useGetWordsQuery } from "shared/api/RTKService";
import { useAppDispatch, useAppSelector } from "shared/model/hooks";
import { Loader } from "shared/ui/Loader";
import { SettingsButton } from "@/features/SettingsButton/ui";
import Sidebar from "@/widgets/Sidebar/ui";
import { InputText } from "@/features/InputText";

const ClikClik = () => {
  const { configurationText } = useAppSelector(
    (state) => state.configTextReducer
  );
  const { currentLanguage } = useAppSelector(
    (state) => state.configLanguageReducer
  );
  const keyboardResponce = useGetKeyboardByLanguageQuery(currentLanguage);
  const textResponce = useGetWordsQuery(currentLanguage);

  const dispatch = useAppDispatch();

  const [isLoad, setIsLoad] = React.useState<boolean>(true);

  React.useEffect(() => {
    document.title = "ClikClik";
  }, []);

  React.useEffect(() => {
    setIsLoad(true);
    if (keyboardResponce.isSuccess && textResponce.isSuccess) {
      dispatch(queryKeyboard(keyboardResponce.data));
      dispatch(queryWords(textResponce.data));
      dispatch(
        updateTextInput({
          config: configurationText,
          symbols: keyboardResponce.data[0].keyCases.symbols,
        })
      );
      setTimeout(() => {
        setIsLoad(false);
      }, 300);
    }
  }, [keyboardResponce, textResponce]);

  return (
    <div className={styles.container}>
      <Header />
      {isLoad ? (
        <Loader />
      ) : (
        <div>
          <InputText />
          <Keyboard />
        </div>
      )}
      <SettingsButton />
      <Sidebar />
    </div>
  );
};

export default ClikClik;