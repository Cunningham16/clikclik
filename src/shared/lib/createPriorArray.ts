import { TextInputConfig } from "@/features/model";

export const createPriorArray = (inputText: TextInputConfig[]) => {
  let arrayText = inputText
    .filter((elem) => elem.isTypo)
    .map((elem) => {
      return elem.content;
    });
  const stack = arrayText.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});

  let array = [];
  for (let elem in stack) {
    array.push(stack[elem]);
  }
  let array1 = [];
  let maxValue = Math.max.apply(null, array);

  for (let elem in stack) {
    if (stack[elem] === maxValue) {
      array1.push({ content: elem, priority: 1 });
    } else if (maxValue / stack[elem] <= 0.4) {
      array1.push({ content: elem, priority: 2 });
    } else if (maxValue / stack[elem] >= 0.4) {
      array1.push({ content: elem, priority: 3 });
    }
  }
  return array1;
};
