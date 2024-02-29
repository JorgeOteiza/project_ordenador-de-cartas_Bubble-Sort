export function bubbleSort(array) {
  const bubbleLog = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      const value1 = parseInt(
        array[j].querySelector(".centered-text").textContent
      );
      const value2 = parseInt(
        array[j + 1].querySelector(".centered-text").textContent
      );
      if (value1 > value2) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        bubbleLog.push(`Swapped ${value1} with ${value2}`);
      }
    }
  }
  return bubbleLog;
}
