/* eslint-disable no-console */

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

// Función para generar una fila de cartas con las cartas clonadas
function generateCardRow(cards) {
  const row = document.createElement("div");
  row.className = "card-row";
  cards.forEach(card => {
    console.log("Tipo de card:", typeof card);
    console.log("Contenido de card:", card);

    const clonedCard = card.cloneNode(true); // Clonar la carta existente
    row.appendChild(clonedCard); // Agregar la carta clonada al contenedor de fila
  });
  return row;
}

// Función para generar cartas ordenadas
export function generateOrderedCards(allCards, bubbleLog) {
  // Creamos una copia de las cartas originales para no modificar el estado inicial
  const orderedCards = allCards.slice();

  // Recorremos el registro de burbujas para aplicar los intercambios de cartas
  bubbleLog.forEach(step => {
    step.forEach((cardIndex, index) => {
      // Obtenemos las cartas correspondientes a los índices
      const currentCard = orderedCards[cardIndex];
      const nextCard = orderedCards[index + 1];

      // Intercambiamos las cartas si es necesario para ordenarlas
      if (
        currentCard &&
        nextCard &&
        currentCard.textContent > nextCard.textContent
      ) {
        // Insertamos la carta actual en la posición correcta
        orderedCards.splice(index + 1, 1, currentCard);
        // Insertamos la siguiente carta en la posición anterior
        orderedCards.splice(cardIndex, 1, nextCard);
      }
    });
  });

  return orderedCards;
}
