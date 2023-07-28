import { Oval } from "react-loader-spinner";
import styles from "./styles.module.scss";
import {FC} from "react"

interface Props {
  size: "normal" | "fullscreen"
}

export const Loader: FC<Props> = ({ size }) => {
  return (
    <div className={size === "normal" ? styles.loader_normal : styles.loader_fullscreen}>
      <Oval
        height={50}
        width={50}
        color="#fff"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#94959e"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};
