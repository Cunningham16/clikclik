import { KeyboardCasesKeys } from "shared/types/KeyConfig";
import { KeyboardCases } from "shared/types/KeyConfig";
import { KeyConfig } from "shared/types/KeyConfig";

export const setErrorKey = (
  arrayList: KeyConfig[],
  pressedKey: string,
  keysCases: KeyboardCases
) => {
  let detectedGroup: string;
  let foundMatch = false;

  for (let elem in keysCases) {
    let isOnArray = keysCases[elem as keyof KeyboardCasesKeys].includes(pressedKey);
    if (isOnArray) {
      detectedGroup = elem;
      foundMatch = true;
      break;
    }
  }

  if (foundMatch) {
    return arrayList.map((elem) => {
      if (
        (detectedGroup === "downCase" &&
          (elem.content1.toLowerCase() === pressedKey || elem.content1 === pressedKey)) ||
        (detectedGroup === "upperCase" && elem.content1 === pressedKey) ||
        (detectedGroup === "symbols" &&
          (elem.content1 === pressedKey || elem.content2 === pressedKey))
      ) {
        elem.errorPressed = true;
      }
      return elem;
    });
  }

  return arrayList;
};
