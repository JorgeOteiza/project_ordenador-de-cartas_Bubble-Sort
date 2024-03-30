/* eslint-disable no-console */

import { generateCards } from "./generateCards.js";
import { bubbleSort } from "./bubbleSort.js";
import { generateCardRows, generateOrderedCards } from "./generateCards.js";

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

  // Genera y muestra las cartas
  const cards = generateCards(numCards); // genera las cartas
  initialCardState = cards.slice();
  const numCardsPerRow = calculateCardsPerRow(cards.length, 1); // calcula el número de cartas por fila
  const cardRows = generateCardRows(cards, numCardsPerRow); // genera las filas de cartas
  displayCards(cardRows); // muestra las filas de cartas en el contenedor
  console.log("Después de llamar a draw()");
}

function sortAndAnimate() {
  console.log("Antes de llamar a sortAndAnimate()");
  const cardsContainer = document.getElementById("cardsContainer");
  const allCards = Array.from(cardsContainer.querySelectorAll(".card"));

  // Obtiene el texto de cada carta para ordenar
  const cardTexts = allCards.map(
    card => card.querySelector(".centered-text").textContent
  );

  // Ordena las cartas
  const bubbleLog = [];
  bubbleSort(cardTexts, bubbleLog);

  // Muestra el registro de bubble sort
  displayBubbleLog(bubbleLog, allCards.length);
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

function displayCards(cardRows) {
  const cardsContainer = document.getElementById("cardsContainer");
  if (!cardsContainer) {
    console.error("No se encontró el contenedor de cartas en el DOM.");
    return;
  }

  // Limpia el contenedor antes de agregar las cartas
  cardsContainer.innerHTML = "";

  // Agrega las filas de cartas al contenedor de cartas
  cardRows.forEach(row => {
    // Verifica si row es un array antes de intentar iterar sobre él
    if (Array.isArray(row)) {
      const cardRowElement = document.createElement("div");
      cardRowElement.className = "card-row";

      // Agrega cada carta a la fila de cartas
      row.forEach(card => {
        if (card instanceof Node) {
          cardRowElement.appendChild(card);
        } else {
          console.error("Carta no válida:", card);
        }
      });

      // Agrega la fila de cartas al contenedor de cartas
      cardsContainer.appendChild(cardRowElement);
    } else {
      console.error("La fila de cartas no es un array:", row);
    }
  });
}
