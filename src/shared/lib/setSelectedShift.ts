import type { KeyConfig } from "shared/types/KeyConfig";

/**
 * This function finds Shift key and select it
 * @param positionShift what Shift key we need
 * @param keysList current config of keyboard
 */

export function setSelectedShift(
  positionShift: "right" | "left",
  keysList: Array<KeyConfig>
) {
  for (let elem of keysList) {
    if (elem.positionFor !== undefined && elem.positionFor === positionShift) {
      elem.selected = true;
    }
  }
}