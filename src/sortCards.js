import { bubbleSort } from "./bubbleSort.js";

export function bubbleSortCards() {
  const cardsContainer = document.getElementById("cardsContainer");
  if (!cardsContainer) {
    // console.error("No se pudo encontrar el contenedor de cartas");
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

export { bubbleSort, customBubbleSort };
