/* eslint-disable no-console */

import { bubbleSort } from "./bubbleSort.js";

// Función para generar cartas aleatorias
export function generateCards(numCards) {
  const suitsSymbols = ["♠", "♣", "♥", "♦"];
  const cards = [];

  for (let i = 0; i < numCards; i++) {
    const randomSuit =
      suitsSymbols[Math.floor(Math.random() * suitsSymbols.length)];
    const randomCardNumber = Math.floor(Math.random() * 13) + 1;
    const cardElement = generateCard(randomSuit, randomCardNumber);
    cards.push(cardElement);
  }

  return cards;
}

// Función para generar una carta con un palo y número aleatorio
function generateCard(randomSuit, randomCardNumber) {
  const card = document.createElement("div");
  card.className = "card";

  const topSymbol = document.createElement("div");
  topSymbol.className = "corner-symbol top-left";
  topSymbol.textContent = randomSuit;

  const bottomSymbol = document.createElement("div");
  bottomSymbol.className = "corner-symbol bottom-right";
  bottomSymbol.textContent = randomSuit;

  const centeredText = document.createElement("div");
  centeredText.className = "centered-text";
  const cardNumber =
    randomCardNumber === 1
      ? "A"
      : randomCardNumber < 11
      ? randomCardNumber
      : ["J", "Q", "K"][randomCardNumber - 11];
  centeredText.textContent = cardNumber;

  if (randomSuit === "♥" || randomSuit === "♦") {
    topSymbol.classList.add("heart");
    bottomSymbol.classList.add("heart");
  }

  card.appendChild(topSymbol);
  card.appendChild(centeredText);
  card.appendChild(bottomSymbol);

  return card;
}

// Función para generar filas de cartas
export function generateCardRows(cards, cardsPerRow) {
  const cardRows = [];
  for (let i = 0; i < cards.length; i += cardsPerRow) {
    const row = generateCardRow(cards.slice(i, i + cardsPerRow));
    cardRows.push(row);
  }
  return cardRows;
}

// Función para generar una fila de cartas
function generateCardRow(cards) {
  const row = document.createElement("div");
  row.className = "card-row";
  cards.forEach(card => {
    const clonedCard = card.cloneNode(true); // Clonar la carta existente
    row.appendChild(clonedCard); // Agregar la carta clonada al contenedor de fila
  });
  return row;
}

// Función para aplicar estilos a las cartas ordenadas
function applyOrderedCardStyles() {
  const orderedCards = document.querySelectorAll(".card");
  orderedCards.forEach((card, index) => {
    // Aplicar estilos específicos según el índice de la carta ordenada
    card.style.order = index + 1;
    card.style.backgroundColor = "lightblue"; // Ejemplo de estilo
    // Puedes agregar más estilos aquí según sea necesario
  });
}
