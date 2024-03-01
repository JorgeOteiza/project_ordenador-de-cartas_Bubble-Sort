/* eslint-disable no-console */

import { generateCards, generateCardRows } from "./generateCards.js";
import { bubbleSortCards, animateBubbleSort } from "./sortCards.js";

document.addEventListener("DOMContentLoaded", function() {
  const drawButton = document.getElementById("draw");
  const sortButton = document.getElementById("sort");

  drawButton.addEventListener("click", draw);
  sortButton.addEventListener("click", sortAndAnimate);
});

let initialCardState = [];

function draw() {
  const numCardsInput = document.getElementById("numCards");
  const numCards = parseInt(numCardsInput.value);
  const cardsContainer = document.getElementById("cardsContainer");

  if (!cardsContainer) {
    console.error("Elemento cardsContainer no encontrado en el DOM.");
    return;
  }

  const cards = generateCards(numCards);
  initialCardState = cards.slice();

  cardsContainer.innerHTML = "";

  const cardRows = generateCardRows(cards, 6);
  cardRows.forEach(row => {
    cardsContainer.appendChild(row);
  });

  sortAndAnimate();
}

function sortAndAnimate() {
  const cardsContainer = document.getElementById("cardsContainer");
  const allCards = Array.from(cardsContainer.children);

  animateBubbleSort(allCards)
    .then(bubbleLog => {
      displayBubbleLog(bubbleLog);
    })
    .catch(error => {
      console.error(
        "Ocurrió un error durante la animación de bubble sort:",
        error
      );
    });
}

function displayBubbleLog(bubbleLog) {
  const bubbleLogContainer = document.getElementById("bubbleLog");
  bubbleLogContainer.innerHTML = "";

  for (let i = 0; i < bubbleLog.length; i++) {
    const logItem = document.createElement("div");
    logItem.textContent = bubbleLog[i];
    bubbleLogContainer.appendChild(logItem);
  }
}
