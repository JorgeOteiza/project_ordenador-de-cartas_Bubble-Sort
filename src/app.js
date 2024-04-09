/* eslint-disable no-console */

import {
  generateCards,
  generateCardRows,
  displayCards
} from "./generateCards.js";
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

let originalCards = [];

function draw() {
  console.log("Antes de llamar a draw()");
  const bubbleLogContainer = document.getElementById("bubbleLog");
  bubbleLogContainer.innerHTML = "";

  const numCardsInput = document.getElementById("numCards");
  const numCards = parseInt(numCardsInput.value);
  const cardsContainer = document.getElementById("cardsContainer");

  if (!cardsContainer) {
    console.error("Elemento cardsContainer no encontrado en el DOM.");
    return;
  }

  // Genera las cartas y las almacena en originalCards
  originalCards = generateCards(numCards);
  const numCardsPerRow = calculateCardsPerRow(numCards, 1);
  const cardRows = generateCardRows(originalCards, numCardsPerRow);
  displayCards(cardRows);
  console.log("Después de llamar a draw()");
}

function sortAndAnimate() {
  console.log("Antes de llamar a sortAndAnimate()");

  // Utiliza las cartas originales para ordenar
  const cardTexts = originalCards.map(
    card => card.querySelector(".centered-text").textContent
  );

  // Realiza el ordenamiento y registra los cambios en el bubble log
  const { sortedCards, bubbleLog } = bubbleSort(cardTexts);

  // Muestra el registro de bubble sort
  displayBubbleLog(bubbleLog, sortedCards.length);

  // Actualiza el orden de las cartas en la interfaz
  sortedCards.forEach((cardText, index) => {
    originalCards[index].querySelector(".centered-text").textContent = cardText;
  });

  console.log("Después de llamar a sortAndAnimate()");
}

function displayBubbleLog(bubbleLog, totalCards) {
  const bubbleLogContainer = document.getElementById("bubbleLog");
  bubbleLogContainer.innerHTML = ""; // Limpia el contenedor de registro

  // Verifica si bubbleLog es válido y no está vacío
  if (!Array.isArray(bubbleLog) || bubbleLog.length === 0) {
    console.error("Invalid bubbleLog provided.");
    return;
  }

  // Definir el número de cartas por fila
  const numCardsPerRow = calculateCardsPerRow(totalCards, bubbleLog.length);

  // Recorre cada paso del registro y muestra las filas de cartas
  bubbleLog.forEach((step, index) => {
    const cardRows = generateCardRows(step, numCardsPerRow);
    cardRows.forEach(row => {
      bubbleLogContainer.appendChild(row);
    });
    // Agregar un espacio entre cada fila generada
    if (index < bubbleLog.length - 1) {
      bubbleLogContainer.appendChild(document.createElement("br"));
    }
  });
}

// Calcular el número de cartas por fila
function calculateCardsPerRow(totalCards, numSteps) {
  const numCards = totalCards / numSteps; // Calcular la cantidad promedio de cartas por paso
  return Math.ceil(numCards); // Redondear hacia arriba para garantizar al menos 1 carta por fila
}
