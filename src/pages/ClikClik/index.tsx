import React from "react";
import { Header } from "widgets/Header/ui";
import {queryWords, updateTextInput} from "@/features/InputText/";
import { Keyboard } from "@/widgets/Keyboard/ui";
import styles from "./styles.module.scss";
import { queryKeyboard } from "shared/model/keyboardSlice";
import { useAppDispatch, useAppSelector } from "shared/model/hooks";
import { Loader } from "shared/ui/Loader";
import { SettingsButton } from "@/features/SettingsButton/ui";
import Sidebar from "@/widgets/Sidebar/ui";
import { InputText } from "@/features/InputText";
import { useFetch } from "@/shared/hooks/useFetch";
import { AxiosService } from "@/shared/api/AxiosService";
import { LoaderComponent } from "@/widgets/LoaderComponent";

const ClikClik = () => {
  const { configurationText } = useAppSelector(
    (state) => state.configTextReducer
  );
  const { currentLanguage } = useAppSelector(
    (state) => state.configLanguageReducer
  );

  const dispatch = useAppDispatch();

  const [isLoad, setIsLoad] = React.useState<boolean>(true);

  React.useEffect(() => {
    document.title = "ClikClik";
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <LoaderComponent />
      <SettingsButton />
      <Sidebar />
    </div>
  );
};

export default ClikClik;