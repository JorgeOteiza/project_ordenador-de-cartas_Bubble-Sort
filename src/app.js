import { generateCards, generateCardRows } from "./generateCards.js";
import { bubbleSortCards } from "./sortCards.js";

document.addEventListener("DOMContentLoaded", function() {
  const drawButton = document.getElementById("draw");
  const sortButton = document.getElementById("sort");

  drawButton.addEventListener("click", draw);
  sortButton.addEventListener("click", bubbleSortHandler);
});

let initialCardState = [];

function draw() {
  const numCardsInput = document.getElementById("numCards");
  const numCards = parseInt(numCardsInput.value);
  const cards = generateCards(numCards);

  initialCardState = cards.slice();

  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = "";

  const cardRows = generateCardRows(cards, 6);
  cardRows.forEach(row => {
    cardsContainer.appendChild(row);
  });

  bubbleSortCards()
    .then(displayBubbleLog)
    .catch(error => console.error(error));
}

function displayBubbleLog(bubbleLog) {
  const bubbleLogContainer = document.getElementById("bubbleLog");
  bubbleLogContainer.innerHTML = "";

  bubbleLog.forEach(log => {
    const logItem = document.createElement("div");
    logItem.textContent = log;
    bubbleLogContainer.appendChild(logItem);
  });
}

function bubbleSortHandler() {
  bubbleSortCards()
    .then(displayBubbleLog)
    .catch(error => console.error(error));
}
