import { KeyboardCasesKeys } from "shared/types/KeyConfig";
import { setSelectedShift } from "shared/lib/setSelectedShift";
import { KeyboardCases } from "shared/types/KeyConfig";
import { KeyConfig } from "shared/types/KeyConfig";

export const setSelectedKey = (
  keysCases: KeyboardCases,
  lastLetter: string,
  keysList: KeyConfig[]
) => {
  let objectDetected;
  for (let elem in keysCases) {
    let isOnArray = keysCases[elem as keyof KeyboardCasesKeys].includes(lastLetter);
    if (isOnArray) {
      objectDetected = {
        isOnArray,
        elemArray: elem,
      };
      break;
    }
  }

  if (objectDetected === undefined) {
    return keysList;
  }

  if (objectDetected?.isOnArray && objectDetected.elemArray === "downCase") {
    keysList = keysList.map((elem) => {
      elem.selected = false;
      if (elem.content1 === lastLetter.toUpperCase() || elem.content1 === lastLetter) {
        elem.selected = true;
      }
      return elem;
    });
    return keysList;
  } else if (objectDetected?.isOnArray && objectDetected.elemArray === "upperCase") {
    keysList.map((elem) => {
      elem.selected = false;
      return elem;
    });
    let needShift2: "left" | "right";
    for (let elem of keysList) {
      if (elem.content1 === lastLetter) {
        elem.selected = true;
        needShift2 = elem.needShift;
      }
    }
    setSelectedShift(needShift2, keysList);
    return keysList;
  } else if (objectDetected?.isOnArray && objectDetected.elemArray === "symbols") {
    keysList.map((elem) => {
      elem.selected = false;
      return elem;
    });

    let needShift3: "left" | "right";
    for (let elem of keysList) {
      if (elem.content1 === lastLetter) {
        elem.selected = true;
      } else if (elem.content2 === lastLetter) {
        elem.selected = true;
        needShift3 = elem.needShift;
      }
    }
    setSelectedShift(needShift3, keysList);
    return keysList;
  }
};
