import DefaultButton from "@/shared/ui/DefaultButton";
import styles from "./styles.module.scss";
import settingsImg from "shared/assets/img/gear-fill.svg";
import { setIsOpenSidebar } from "../model";
import { useAppDispatch } from "@/shared/model";

export const SettingsButton = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.container}>
      <DefaultButton
        img={settingsImg}
        onClick={() => dispatch(setIsOpenSidebar(true))}
      />
    </div>
  );
};