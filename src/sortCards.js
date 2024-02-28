import { displayChangeLog } from "./app.js";

function bubbleSort(arr) {
  const bubbleLog = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      const value1 = parseInt(
        arr[j].querySelector(".centered-text").textContent
      );
      const value2 = parseInt(
        arr[j + 1].querySelector(".centered-text").textContent
      );
      if (value1 > value2) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        bubbleLog.push(`Swapped ${value1} with ${value2}`);
      }
    }
  }
  return bubbleLog;
}

export function bubbleSortCards() {
  const cardsContainer = document.getElementById("cardsContainer");
  if (!cardsContainer) {
    console.error("No se pudo encontrar el contenedor de cartas");
    return;
  }
  const allCards = Array.from(cardsContainer.children);

  return bubbleSort(allCards);
}

function customBubbleSort(elementList) {
  const arrayNumbers = elementList.map(el => {
    const value = el.querySelector(".centered-text").innerHTML;
    if (value === "J") return 10;
    else if (value === "Q") return 11;
    else if (value === "K") return 12;
    else if (value === "A") return 1;
    else return Number(value);
  });

  customBubbleSort(arrayNumbers);

  return elementList;
}

function displayChangeLog() {}

export { bubbleSort };
