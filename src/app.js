/* eslint-disable no-console */

import { generateCards } from "./generateCards.js";
import { bubbleSort } from "./bubbleSort.js";

document.addEventListener("DOMContentLoaded", function() {
  // Verifica la compatibilidad de navegadores
  if (!document.getElementById || !Array.from) {
    console.error(
      "Tu navegador no es compatible con esta aplicación. Actualiza tu navegador."
    );
    return;
  }
  const drawButton = document.getElementById("draw");
  const sortButton = document.getElementById("sort");

  drawButton.addEventListener("click", draw);
  sortButton.addEventListener("click", sortAndAnimate);
});

let initialCardState = [];

function generateCardRow(cards) {
  const row = document.createElement("div");
  row.className = "card-row";
  cards.forEach(card => {
    row.appendChild(card);
  });
  return row;
}

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

  // Genera y muestra las cartas
  const cards = generateCards(numCards);
  initialCardState = cards.slice();
  displayCards(cards);
}

function sortAndAnimate() {
  const cardsContainer = document.getElementById("cardsContainer");
  const bubbleLogContainer = document.getElementById("bubbleLog");
  const allCards = Array.from(cardsContainer.querySelectorAll(".card"));

  // Obtiene el texto de cada carta para ordenar
  const cardTexts = allCards.map(
    card => card.querySelector(".centered-text").textContent
  );

  // Ordena las cartas
  const sortedCardLogs = bubbleSort(cardTexts);

  // Animación de transición
  sortedCardLogs.forEach((sortedCardTexts, index) => {
    setTimeout(() => {
      // Genera una nueva fila de cartas para cada paso del algoritmo
      const newCards = sortedCardTexts.map(text => {
        // Encuentra la carta original que coincide con el texto
        const originalCard = allCards.find(
          card => card.querySelector(".centered-text").textContent === text
        );
        // Clona la carta original
        const newCard = originalCard.cloneNode(true);
        return newCard;
      });
      const newCardRow = generateCardRow(newCards);

      // Agrega la nueva fila de cartas al contenedor bubbleLog
      bubbleLogContainer.appendChild(newCardRow);
    }, 300 * index); // Ajusta el tiempo de espera según sea necesario
  });
}

function displayCards(cards) {
  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = "";

  const numColumns = Math.ceil(cards.length / 6); // Calcular el número de columnas basado en la cantidad de cartas
  const cardsPerRow = Math.ceil(cards.length / numColumns); // Calcular la cantidad de cartas por fila

  for (let i = 0; i < numColumns; i++) {
    const startIdx = i * cardsPerRow;
    const endIdx = Math.min(startIdx + cardsPerRow, cards.length);
    const columnCards = cards.slice(startIdx, endIdx);
    const cardRow = generateCardRow(columnCards);
    cardsContainer.appendChild(cardRow);
  }
}
