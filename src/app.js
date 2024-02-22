import { generateCards, generateCardRows } from "./generateCards.js";
import { bubbleSortCards } from "./sortCards.js";

document.addEventListener("DOMContentLoaded", function() {
  const sortButton = document.getElementById("sort");
  const drawButton = document.getElementById("draw");

  drawButton.addEventListener("click", draw);
  sortButton.addEventListener("click", bubbleSortCards);
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

  displayChangeLog();
}

function displayChangeLog() {
  const bubbleLog = document.getElementById("cardsContainer");
  bubbleLog.innerHTML = "";

  const cardRows = generateCardRows(initialCardState, 6);
  cardRows.forEach(row => {
    bubbleLog.appendChild(row);
  });
}
