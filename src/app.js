/* eslint-disable no-console */

import { generateCards, generateCardRow } from "./generateCards.js";
import { bubbleSort } from "./bubbleSort.js";

const drawButton = document.getElementById("draw");
const sortButton = document.getElementById("sort");
let isSorting = false;

drawButton.addEventListener("click", draw);
sortButton.addEventListener("click", sortAndAnimate);

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOMContentLoaded se ha ejecutado");
  if (!document.getElementById || !Array.from) {
    console.error(
      "Tu navegador no es compatible con esta aplicación. Actualiza tu navegador."
    );
    return;
  }
});

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
  displayCards(cards);
}

function sortAndAnimate() {
  if (isSorting) return;
  isSorting = true;

  const bubbleLogContainer = document.getElementById("bubbleLog");
  const titleExists = bubbleLogContainer.querySelector(".bubble-log-title");

  // Añadir el título "Bubble Log" si no existe
  if (!titleExists) {
    const title = document.createElement("h3");
    title.className = "bubble-log-title";
    title.textContent = "Bubble Log";
    bubbleLogContainer.appendChild(title);
  }

  const cardsContainer = document.getElementById("cardsContainer");
  const allCards = Array.from(cardsContainer.querySelectorAll(".card"));
  const cardTexts = allCards.map(
    card => card.querySelector(".centered-text").textContent
  );

  const sortedCardLogs = bubbleSort(cardTexts);

  sortedCardLogs.forEach((sortedCardTexts, index) => {
    setTimeout(() => {
      const newCards = sortedCardTexts
        .map(text => {
          const originalCard = allCards.find(
            card => card.querySelector(".centered-text").textContent === text
          );
          return originalCard ? originalCard.cloneNode(true) : null;
        })
        .filter(card => card !== null);

      if (newCards.length > 0) {
        const newCardRow = generateCardRow(newCards);

        // Registrar solo en el bubbleLogContainer
        if (!isDuplicateLog(bubbleLogContainer, newCardRow)) {
          bubbleLogContainer.appendChild(newCardRow.cloneNode(true));
        }
      }

      if (index === sortedCardLogs.length - 1) {
        console.log("¡Ordenamiento completado!");
        isSorting = false;
      }
    }, 300 * index);
  });
}

function displayCards(cards) {
  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = "";
  const numColumns = Math.ceil(cards.length / 6);
  const cardsPerRow = Math.ceil(cards.length / numColumns);

  for (let i = 0; i < numColumns; i++) {
    const startIdx = i * cardsPerRow;
    const endIdx = Math.min(startIdx + cardsPerRow, cards.length);
    const columnCards = cards.slice(startIdx, endIdx);
    const cardRow = generateCardRow(columnCards);
    cardsContainer.appendChild(cardRow);
  }
}

function isDuplicateLog(logContainer, newLogRow) {
  const newLogContent = Array.from(newLogRow.children)
    .map(card => card.querySelector(".centered-text").textContent)
    .join(",");

  return Array.from(logContainer.children).some(row => {
    const existingLogContent = Array.from(row.children)
      .map(card => card.querySelector(".centered-text").textContent)
      .join(",");
    return existingLogContent === newLogContent;
  });
}
