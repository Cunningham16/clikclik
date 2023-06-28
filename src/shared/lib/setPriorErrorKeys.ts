import { KeyboardCasesKeys } from "shared/types/KeyConfig";
import { KeyboardCases } from "shared/types/KeyConfig";
import { KeyConfig } from "shared/types/KeyConfig";

export const setPriorErrorKeys = (
  priorKey: string,
  priority: number,
  arrayList: KeyConfig[],
  keysCases: KeyboardCases
) => {
  let objectDetected;
  let foundMatch = false;

  for (let elem in keysCases) {
    let isOnArray = keysCases[elem as keyof KeyboardCasesKeys].includes(priorKey);
    if (isOnArray) {
      objectDetected = {
        isOnArray,
        elemArray: elem,
      };
      foundMatch = true;
      break;
    }
  }

  if (foundMatch) {
    return arrayList.map((elem) => {
      if (
        (objectDetected.elemArray === "downCase" &&
          (elem.content1.toLowerCase() === priorKey || elem.content1 === priorKey)) ||
        (objectDetected.elemArray === "upperCase" && elem.content1 === priorKey) ||
        (objectDetected.elemArray === "symbols" &&
          (elem.content1 === priorKey || elem.content2 === priorKey))
      ) {
        elem.errorPriority = priority;
      }
      return elem;
    });
  }

  return arrayList;
};
