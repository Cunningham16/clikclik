export const average = (array: number[]) => {
    if (array.length === 0) {
      return 0;
    }
  
    const sum = array.reduce(
      (accumulator, currentValue) => accumulator + currentValue * 60,
      0
    );
  
    return Math.floor(sum / array.length);
  };
  