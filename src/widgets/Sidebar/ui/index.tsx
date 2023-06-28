import React from "react";
import { CSSTransition } from "react-transition-group";
import "./animation.css";
import styles from "./styles.module.scss";
import { ConfigureText } from "@/features/ConfigureText/ui";
import { ConfigureLanguage } from "@/features/ConfigureLanguage/ui";
import { ConfigureKeyboard } from "@/features/ConfigureKeyboard/ui";
import { useAppSelector, useAppDispatch } from "@/shared/model";
import { setIsOpenSidebar } from "@/features/SettingsButton/model";

const Sidebar = () => {
  const nodeRef = React.useRef<HTMLDivElement | null>(null);
  const {isOpenSidebar} = useAppSelector(state => state.sidebarReducer)
  const dispatch = useAppDispatch()

  const closeSidebar = () => {
    dispatch(setIsOpenSidebar(false))
  }

  return (
    <CSSTransition
      nodeRef={nodeRef}
      classNames="sidebar"
      in={isOpenSidebar}
      timeout={300}
      unmountOnExit
    >
      <div ref={nodeRef} className={styles.container}>
        <div className={styles.close_sidebar} onClick={closeSidebar}></div>
        <div className={styles.sidebar}>
          <ConfigureText />
          <ConfigureLanguage />
          <ConfigureKeyboard />
        </div>
      </div>
    </CSSTransition>
  );
};

export default Sidebar;
