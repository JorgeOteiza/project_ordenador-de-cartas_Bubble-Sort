/* eslint-disable no-console */
import { generateCards } from "./generateCards.js";
import { bubbleSort } from "./bubbleSort.js";
const drawButton = document.getElementById("draw");
const sortButton = document.getElementById("sort");
drawButton.addEventListener("click", draw);
sortButton.addEventListener("click", sortAndAnimate);
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOMContentLoaded se ha ejecutado");
  // Verifica la compatibilidad de navegadores
  if (!document.getElementById || !Array.from) {
    console.error(
      "Tu navegador no es compatible con esta aplicación. Actualiza tu navegador."
    );
    return;
  }
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
let isSorting = false;

function sortAndAnimate() {
  if (isSorting) {
    return;
  }
  isSorting = true;
  const cardsContainer = document.getElementById("cardsContainer");
  const sortedCardsContainer = document.getElementById("sortedCardsContainer");
  const bubbleLogContainer = document.getElementById("bubbleLog");
  const allCards = Array.from(cardsContainer.querySelectorAll(".card"));
  const cardTexts = allCards.map(
    card => card.querySelector(".centered-text").textContent
  );
  console.log("Ordenando...");
  const sortedCardLogs = bubbleSort(cardTexts);
  sortedCardLogs.forEach((sortedCardTexts, index) => {
    setTimeout(() => {
      const newCards = sortedCardTexts.map(text => {
        const originalCard = allCards.find(
          card => card.querySelector(".centered-text").textContent === text
        );
        const newCard = originalCard.cloneNode(true);
        return newCard;
      });
      const newCardRow = generateCardRow(newCards);
      sortedCardsContainer.appendChild(newCardRow);
      bubbleLogContainer.appendChild(newCardRow);
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
