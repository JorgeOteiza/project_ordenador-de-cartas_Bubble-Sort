/* eslint-disable no-console */

import { generateCards, generateCardRows } from "./generateCards.js";
import { bubbleSort } from "./bubbleSort.js";

document.addEventListener("DOMContentLoaded", function() {
  const drawButton = document.getElementById("draw");
  const sortButton = document.getElementById("sort");

  drawButton.addEventListener("click", draw);
  sortButton.addEventListener("click", sortAndAnimate);
});

let initialCardState = [];

function draw() {
  const bubbleLogContainer = document.getElementById("bubbleLog");
  bubbleLogContainer.innerHTML = "";

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
}

function sortAndAnimate() {
  const cardsContainer = document.getElementById("cardsContainer");
  const allCards = Array.from(cardsContainer.children[0].children);

  const sortedCards = bubbleSort(allCards);
  displayBubbleLog(sortedCards);
}

function displayBubbleLog(bubbleLog) {
  const bubbleLogContainer = document.getElementById("bubbleLog");

  for (let i = 0; i < bubbleLog.length; i++) {
    const currentLogElement = document.createElement("div");

    currentLogElement.classList.add("cards-container");

    const currentLog = Array.from(bubbleLog[i]);
    for (let currentCard of currentLog) {
      currentLogElement.appendChild(currentCard);
    }
    bubbleLogContainer.appendChild(currentLogElement);
  }
}
