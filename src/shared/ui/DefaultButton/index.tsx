import { FC } from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
  img: string;
  onClick?: () => void;
}

const DefaultButton: FC<ButtonProps> = ({ img, onClick }) => {
  return (
    <button className={styles.default} onClick={onClick}>
      <img src={img} alt="" width="25" height="25"/>
    </button>
  );
};

export default DefaultButton;
