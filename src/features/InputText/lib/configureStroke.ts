import { TextInputConfig } from "shared/types/TextInputConfig";

/**
 * A function that returns array of letters and configs for them for ClikClik
 * @param {string} stroke
 * @returns Text array for ClikClik </br>
 */

export const configureStroke: (stroke: string) => TextInputConfig[] = (stroke) => {
  const text = stroke
    .slice(0, -1)
    .split("")
    .map((elem) => {
      return {
        content: elem,
        correctlyPressed: false,
        typoPressed: false,
        isSelected: false,
        isTypo: false,
      };
    });
  return text;
};
