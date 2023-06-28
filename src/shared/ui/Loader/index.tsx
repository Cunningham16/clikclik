import { Oval } from "react-loader-spinner";
import styles from "./styles.module.scss";

export const Loader = () => {
  return (
    <div className={styles.loader_container}>
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
