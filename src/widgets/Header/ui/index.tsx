import { FC, useMemo } from "react";

import { useAppSelector } from "shared/model";

import { ResultDisplay } from "shared/ui/ResultDisplay";
import speedImg from "shared/assets/img/speed.svg";
import accuracyImg from "shared/assets/img/accuracy.svg";
import typosImg from "shared/assets/img/typos.svg";

import styles from "./styles.module.scss";

import { average } from "../lib/average";

export const Header: FC = () => {
  const { typos, speedArray, accuracy } = useAppSelector((state) => state.InputTextReducer);

  const averageValue = useMemo(() => average(speedArray), [speedArray]);

  return (
    <div className={styles.container}>
      <ResultDisplay imageSrc={speedImg} resultValue={averageValue} resultPlaceholder="Speed" />
      <ResultDisplay
        imageSrc={accuracyImg}
        resultValue={accuracy}
        resultType="%"
        resultPlaceholder="Accuracy"
      />
      <ResultDisplay imageSrc={typosImg} resultValue={typos} resultPlaceholder="Typos" />
    </div>
  );
};
