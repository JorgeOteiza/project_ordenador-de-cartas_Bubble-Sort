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

// Función para generar una fila de cartas con las cartas
export function generateCardRow(cards) {
  const row = document.createElement("div");
  row.className = "card-row";

  cards.forEach(card => {
    row.appendChild(card);
  });

  return row;
}

// Función para generar una columna de cartas
export function generateCardColumn(cards) {
  const column = document.createElement("div");
  column.className = "card-column";

  cards.forEach(card => {
    column.appendChild(card);
  });

  return column;
}
