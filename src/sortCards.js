/* eslint-disable no-undef */
import { bubbleSort } from "./bubbleSort.js";

export function bubbleSortCards() {
  const cardsContainer = document.getElementById("cardsContainer");
  if (!cardsContainer) {
    return Promise.resolve([]);
  }
  const allCards = Array.from(cardsContainer.children);

  return animateBubbleSort(allCards);
}

export function animateBubbleSort(cards) {
  return new Promise((resolve, reject) => {
    const bubbleLog = bubbleSort(cards);
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < bubbleLog.length) {
        const logItem = bubbleLog[i];
        performSwap(cards, logItem);
        i++;
      } else {
        clearInterval(intervalId);
        resolve(bubbleLog);
      }
    }, 1000);
  });
}

function performSwap(cards, logItem) {
  const [index1, index2] = extractIndices(logItem);
  const tempStyle = cards[index1].style.transform;
  cards[index1].style.transform = cards[index2].style.transform;
  cards[index2].style.transform = tempStyle;
  cards[index1].classList.toggle("sorted");
  cards[index2].classList.toggle("sorted");
}

function extractIndices(logItem) {
  const indices = logItem.match(/\d+/g);
  return [parseInt(indices[0]), parseInt(indices[1])];
}
/* eslint-enable no-undef */
