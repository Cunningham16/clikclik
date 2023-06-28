import { FC } from "react";

import styles from "./styles.module.scss";

type ResultDisplayProps = {
  imageSrc: string;
  resultValue: string | number;
  resultType?: string;
  resultPlaceholder: string;
};

export const ResultDisplay: FC<ResultDisplayProps> = ({
  imageSrc,
  resultValue,
  resultType,
  resultPlaceholder,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.img_container}>
        <img src={imageSrc} alt="img" />
      </div>
      <div className={styles.result_container}>
        <div className={styles.number}>
          <p className={styles.result}>{resultValue}</p>
          {resultType && <p className={styles.type}>{resultType}</p>}
        </div>
        <p className={styles.placeholder}>{resultPlaceholder}</p>
      </div>
    </div>
  );
};
