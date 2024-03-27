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
  cards.forEach(cardText => {
    const cardElement = document.createElement("div"); // Crear un nuevo elemento div para cada carta
    const cardNode = document.createTextNode(cardText); // Crear un nuevo nodo de texto con el texto de la carta
    cardElement.appendChild(cardNode); // Agregar el nodo de texto como hijo del elemento div
    row.appendChild(cardElement); // Agregar el elemento div de la carta como hijo de la fila
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

  // Recorre cada paso del registro y muestra las filas de cartas
  bubbleLog.forEach(step => {
    const row = generateCardRow(step);
    bubbleLogContainer.appendChild(row);
  });
}

function displayCards(cards) {
  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = "";

  const numColumns = Math.ceil(cards.length / 6); // Calcula el número de columnas de acuerdo a la cantidad de cartas
  const cardsPerRow = Math.ceil(cards.length / numColumns); // Calcular la cantidad de cartas por fila

  for (let i = 0; i < numColumns; i++) {
    const startIdx = i * cardsPerRow;
    const endIdx = Math.min(startIdx + cardsPerRow, cards.length);
    const columnCards = cards.slice(startIdx, endIdx);
    const cardRow = generateCardRow(columnCards);

    // Modifica la generación de las cartas en la fila
    const cardElements = columnCards.map(card => {
      const cardElement = document.createElement("div");
      cardElement.textContent = card.textContent;
      return cardElement;
    });

    cardElements.forEach(cardElement => {
      cardRow.appendChild(cardElement); // Agrega el nuevo elemento div de la carta a la fila
    });

    cardsContainer.appendChild(cardRow);
  }
}
