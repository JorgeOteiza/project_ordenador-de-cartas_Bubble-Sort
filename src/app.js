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
  const allCards = Array.from(cardsContainer.querySelectorAll(".card"));

  // Obtiene el texto de cada carta para ordenar
  const cardTexts = allCards.map(
    card => card.querySelector(".centered-text").textContent
  );

  // Ordena las cartas
  const sortedCardTexts = bubbleSort(cardTexts);

  // Animación de transición
  allCards.forEach((card, index) => {
    setTimeout(() => {
      // Agrega una clase de transición CSS
      card.classList.add("transition");
      // Espera un breve momento antes de actualizar el contenido
      setTimeout(() => {
        // Actualiza el texto de la carta
        card.querySelector(".centered-text").textContent =
          sortedCardTexts[index];
      }, 200 * index); // Ajusta el tiempo de espera según sea necesario
    }, 300 * index); // Ajusta el tiempo de espera según sea necesario
  });
}

function displayBubbleLog(bubbleLog) {
  const bubbleLogContainer = document.getElementById("bubbleLog");

  // Verificar si bubbleLog está definido y no es un array vacío
  if (!Array.isArray(bubbleLog) || bubbleLog.length === 0) {
    console.error("Invalid bubbleLog provided.");
    return;
  }

  for (let i = 0; i < bubbleLog.length; i++) {
    const currentLogElement = document.createElement("div");
    currentLogElement.classList.add("cards-container");

    if (Array.isArray(bubbleLog[i])) {
      const currentLog = Array.from(bubbleLog[i]);
      currentLog.forEach(currentCard => {
        if (currentCard instanceof HTMLElement) {
          currentLogElement.appendChild(currentCard);
        } else {
          console.error("Invalid entry in currentLog array.");
        }
      });
    } else {
      console.error("Invalid entry in bubbleLog array.");
    }

    bubbleLogContainer.appendChild(currentLogElement);
  }
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
