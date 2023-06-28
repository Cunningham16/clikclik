import { ConfigText } from "shared/types/SidebarConfig";

const selectWord = (arrayWords: string[]) => {
  let randomNum = Math.floor(arrayWords.length * Math.random());
  return arrayWords[randomNum];
};

const getRandomNumber = () => {
  const num = Math.floor(Math.random() * 999);
  return String(num);
};

const getCapitalLetter = (word: string, isCapital: boolean) => {
  if (isCapital && Math.random() > 0.5) {
    let firstLetter = word[0];
    return firstLetter.toUpperCase() + word.slice(1);
  } else {
    return word;
  }
};

const getPunctuation = (isPunctuation: boolean, symbolsArray: string[]) => {
  if (isPunctuation && Math.random() >= 0.4) {
    return selectWord(symbolsArray);
  } else {
    return "";
  }
};

/**
 * A function that generates text based on configuration
 * @param {configText} config - configs for text
 * @param {string[]} keyCases - keys cases (only for symbols)
 * @param {string[]} arrayWords - array of words
 * @returns Generated stroke
 */

export const generateText = (
  config: ConfigText,
  symbols: string[],
  arrayWords: string[]
) => {
  const { isNumbers, isCapitalLetters, isPunctuation } = config;

  let string = "";
  while (string.length < 80) {
    let word: string;

    if (isNumbers && Math.random() <= 0.4) {
      word = getRandomNumber() + getPunctuation(isPunctuation, symbols);
    } else {
      word =
        getCapitalLetter(selectWord(arrayWords), isCapitalLetters) +
        getPunctuation(isPunctuation, symbols);
    }

    if (string.length + word.length + 1 < 80) {
      string = string + word + " ";
    } else {
      break;
    }
  }
  return string;
};
