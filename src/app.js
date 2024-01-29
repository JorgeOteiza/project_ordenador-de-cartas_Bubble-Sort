import "./style.css";

const suitsSymbols = {
  spade: "♠",
  club: "♣",
  heart: "♥",
  diamond: "♦"
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Función para generar una carta
function generateCard(randomSuit, randomCardNumber) {
  // Crea la carta
  const card = document.createElement("div");
  card.className = "card";

  // Crea los elementos para los símbolos en las esquinas
  const topSymbol = document.createElement("div");
  topSymbol.className = "corner-symbol top-left";
  topSymbol.textContent = suitsSymbols[randomSuit];

  const bottomSymbol = document.createElement("div");
  bottomSymbol.className = "corner-symbol bottom-right";
  bottomSymbol.textContent = suitsSymbols[randomSuit];

  // Crea el elemento para el número o letra centrado
  const centeredText = document.createElement("div");
  centeredText.className = "centered-text";
  const cardNumber =
    randomCardNumber < 9
      ? randomCardNumber + 2
      : ["J", "Q", "K", "A"][randomCardNumber - 9];
  centeredText.textContent = cardNumber;

  // Verifica si la carta es roja y cambia el color del símbolo de corazones a rojo
  if (randomSuit === "heart" || randomSuit === "diamond") {
    topSymbol.style.color = "red";
    bottomSymbol.style.color = "red";
  }

  // Agrega los elementos a la carta
  card.appendChild(topSymbol);
  card.appendChild(centeredText);
  card.appendChild(bottomSymbol);

  return card;
}

// Función para generar cartas automáticamente
function generateCards() {
  const cardsContainer = document.getElementById("cardsContainer");

  for (let i = 1; i <= 13; i++) {
    const randomSuitIndex = getRandomNumber(0, 3);
    const randomCardNumber = getRandomNumber(0, 13);
    const randomSuit = suitsSymbols[randomSuitIndex];

    // Crea una carta
    const card = generateCard(randomSuit, randomCardNumber);

    // Agrega la carta al contenedor
    cardsContainer.appendChild(card);
  }
}

// Llama a la función para generar cartas al cargar la página
generateCards();

// Función para ordenar las cartas con Bubble Sort
function bubbleSort() {
  const cardsContainer = document.querySelectorAll(".card");
  const cardsArray = Array.from(cardsContainer);

  for (let i = 0; i < cardsArray.length - 1; i++) {
    for (let j = 0; j < cardsArray.length - 1 - i; j++) {
      const currentCard = cardsArray[j];
      const nextCard = cardsArray[j + 1];

      const currentCardValue = parseInt(
        currentCard.querySelector(".centered-text").textContent
      );
      const nextCardValue = parseInt(
        nextCard.querySelector(".centered-text").textContent
      );

      if (currentCardValue > nextCardValue) {
        const temp = cardsArray[j];
        cardsArray[j] = cardsArray[j + 1];
        cardsArray[j + 1] = temp;
      }
    }
  }

  // Mueve las cartas ordenadas al contenedor
  const cardContainer = document.getElementById("cardsContainer");
  cardContainer.innerHTML = "";
  cardsArray.forEach(card => {
    cardContainer.appendChild(card);
  });
}

// Llama a la función para ordenar las cartas
bubbleSort();
