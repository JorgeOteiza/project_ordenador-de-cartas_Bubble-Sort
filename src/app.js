import "./style.css";
import { generateCards } from "./generateCards.js";

function bubbleSort(arr) {
  const len = arr.length;
  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < len - 1; i++) {
      if (arr[i].textContent > arr[i + 1].textContent) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);

  return arr;
}

function generateCardRow(cards) {
  const row = document.createElement("div");
  row.className = "card-row";

  cards.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.innerHTML = card;
    row.appendChild(cardElement);
  });

  return row;
}

function generateCardRows(cards, cardsPerRow) {
  const cardRows = [];
  for (let i = 0; i < cards.length; i += cardsPerRow) {
    const row = generateCardRow(cards.slice(i, i + cardsPerRow));
    cardRows.push(row);
  }
  return cardRows;
}

function draw(numCards) {
  const cardsContainer = document.getElementById("cardsContainer");
  const bubbleLog = document.getElementById("bubbleLog");

  cardsContainer.innerHTML = "";
  bubbleLog.innerHTML = "";

  const cards = generateCards(numCards);
  cards.forEach(card => {
    cardsContainer.appendChild(card);
  });

  bubbleLog.innerHTML = "";

  const allCards = Array.from(cardsContainer.children);
  const cardRows = generateCardRows(allCards, 6);
  cardRows.forEach(row => {
    bubbleLog.appendChild(row);
  });
}

function generateColumns(numColumns, numCards) {
  const bubbleLog = document.getElementById("bubbleLog");
  bubbleLog.innerHTML = "";

  for (let i = 0; i < numColumns; i++) {
    const column = document.createElement("div");
    column.className = "column";
    for (let j = 0; j < numCards; j++) {
      const card = document.createElement("div");
      card.className = "card";
      column.appendChild(card);
    }
    bubbleLog.appendChild(column);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const sortButton = document.getElementById("sort");
  const drawButton = document.getElementById("draw");

  drawButton.addEventListener("click", () => {
    const numCardsInput = document.getElementById("numCards");
    const numCards = parseInt(numCardsInput.value);
    draw(numCards);
  });

  sortButton.addEventListener("click", () => {
    const numCards = document.getElementById("numCards").value;
    const cardsContainer = document.getElementById("cardsContainer");
    const allCards = Array.from(cardsContainer.children);
    const sortedCards = bubbleSort(allCards);
    cardsContainer.innerHTML = "";
    sortedCards.forEach(card => {
      cardsContainer.appendChild(card);
    });
  });
});
