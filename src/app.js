/* eslint-disable no-console */

import { generateCards } from "./generateCards.js";
import { bubbleSort } from "./bubbleSort.js";
import { generateCardRows } from "./generateCards.js";
import { generateOrderedCards } from "./generateCards.js";

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
  const bubbleLog = [];
  bubbleSort(cardTexts, bubbleLog);

  console.log(bubbleLog);
  // Muestra el registro de bubble sort
  displayBubbleLog(bubbleLog);

  // Genera y muestra las cartas ordenadas
  const orderedCards = generateOrderedCards(allCards, bubbleLog);
  displayCards(orderedCards, cardsContainer);

  // Aplica estilos a las cartas ordenadas
  applyOrderedCardStyles();
}

function applyOrderedCardStyles() {
  const orderedCards = document.querySelectorAll(".card");
  orderedCards.forEach(card => {
    card.classList.add("ordered-card");
  });
}

function displayBubbleLog(bubbleLog) {
  const bubbleLogContainer = document.getElementById("bubbleLog");

  // Limpia el contenedor de registro
  bubbleLogContainer.innerHTML = "";

  // Verifica si bubbleLog es válido y no está vacío
  if (!Array.isArray(bubbleLog) || bubbleLog.length === 0) {
    console.error("Invalid bubbleLog provided.");
    return;
  }

  // Definir el número de cartas por fila
  const numCardsPerRow = calculateCardsPerRow(bubbleLog);

  // Recorre cada paso del registro y muestra las filas de cartas
  bubbleLog.forEach(step => {
    if (
      Array.isArray(step) &&
      step.every(card => card instanceof HTMLElement)
    ) {
      const cardRows = generateCardRows(step, numCardsPerRow);
      cardRows.forEach(row => {
        const clonedRow = row.cloneNode(true);
        bubbleLogContainer.appendChild(clonedRow);

        // Aplicar los mismos estilos a las cartas ordenadas
        const allCards = Array.from(clonedRow.querySelectorAll(".card"));
        allCards.forEach(card => {
          // Agregar estilos adicionales aquí si es necesario
          card.classList.add("ordered-card");
        });
      });
    } else {
      console.error("Step is not an array of HTMLElements:", step);
    }
  });
}

// Calcular el número de cartas por fila
function calculateCardsPerRow(bubbleLog) {
  const totalCards = bubbleLog[0].length; // Obtener la cantidad total de cartas en el primer paso
  const numCards = totalCards / bubbleLog.length; // Calcular la cantidad promedio de cartas por paso
  return Math.ceil(numCards); // Redondear hacia arriba para garantizar al menos 1 carta por fila
}

function displayCards(cards) {
  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = ""; //Limpia el contenedor antes de agregar las cartas

  // Itera sobre todas las cartas y las agrega al contenedor
  cards.forEach(card => {
    cardsContainer.appendChild(card);
  });
}
