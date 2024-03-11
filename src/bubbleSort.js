export function bubbleSort(arr) {
  const mapper = {
    A: 1,
    J: 11,
    Q: 12,
    K: 13
  };

  const mapCardsLetters = value => {
    const mappedValue = mapper[value];
    return typeof mappedValue !== "undefined"
      ? parseInt(mappedValue)
      : parseInt(value);
  };

  var i, j;
  var len = arr.length;

  var isSwapped = false;

  const log = [];

  for (i = 0; i < len; i++) {
    isSwapped = false;

    for (j = 0; j < len - i - 1; j++) {
      const value1 = mapCardsLetters(
        arr[j].querySelector(".centered-text").textContent
      );
      const value2 = mapCardsLetters(
        arr[j + 1].querySelector(".centered-text").textContent
      );

      if (value1 > value2) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        isSwapped = true;

        log.push([...arr]);
      }
    }
  }

  // Print the array
  // console.log(log);

  return log;
}
