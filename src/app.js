/* eslint-disable no-console */

import { generateCards, generateCardRows } from "./generateCards.js";
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

  // Obtiene las cartas generadas al azar
  const allCards = Array.from(cardsContainer.children[0].children);

  // Copia profunda de las cartas generadas al azar
  const randomCards = allCards.map(card => card.cloneNode(true));

  // Ordena y muestra el proceso de animación con las cartas generadas al azar
  const sortedRandomCards = bubbleSort(randomCards);
  displayBubbleLog([sortedRandomCards.map(card => card.cloneNode(true))]);

  // No es necesario ordenar las cartas nuevamente, ya que ya lo hicimos con sortedRandomCards
  // Solo mostramos el resultado final
  displayBubbleLog([sortedRandomCards.map(card => card.cloneNode(true))]);
}

function displayCards(cards) {
  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = "";

  const cardRows = generateCardRows(cards, 6);
  cardRows.forEach(row => {
    cardsContainer.appendChild(row);
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
        if (currentCard instanceof Node) {
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
