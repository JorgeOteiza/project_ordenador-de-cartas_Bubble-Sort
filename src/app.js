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

function generateCard(randomSuit, randomCardNumber) {
  const card = document.createElement("div");
  card.className = "card";

  const topSymbol = document.createElement("div");
  topSymbol.className = "corner-symbol top-left";
  topSymbol.textContent = suitsSymbols[randomSuit];

  const bottomSymbol = document.createElement("div");
  bottomSymbol.className = "corner-symbol bottom-right";
  bottomSymbol.textContent = suitsSymbols[randomSuit];

  const centeredText = document.createElement("div");
  centeredText.className = "centered-text";
  const cardNumber =
    randomCardNumber < 9
      ? randomCardNumber + 2
      : ["J", "Q", "K", "A"][randomCardNumber - 9];
  centeredText.textContent = cardNumber;

  if (randomSuit === "heart" || randomSuit === "diamond") {
    topSymbol.style.color = "red";
    bottomSymbol.style.color = "red";
  }

  card.appendChild(topSymbol);
  card.appendChild(centeredText);
  card.appendChild(bottomSymbol);

  return card.outerHTML;
}

function generateCards() {
  const cardsContainer = document.getElementById("cardsContainer");

  for (let i = 1; i <= 12; i++) {
    const randomSuitIndex = getRandomNumber(0, 3);
    const randomCardNumber = getRandomNumber(0, 13);
    const randomSuit = Object.keys(suitsSymbols)[randomSuitIndex];

    cardsContainer.insertAdjacentHTML(
      "beforeend",
      generateCard(randomSuit, randomCardNumber)
    );
  }
}

function bubbleSort() {
  const cardsContainer = document.getElementById("cardsContainer");
  const cardsArray = Array.from(cardsContainer.children);

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
        cardsContainer.insertBefore(nextCard, currentCard);
        cardsArray[j] = nextCard;
        cardsArray[j + 1] = currentCard;
      }
    }
  }
}

const button = document.querySelector("button");

button.addEventListener("click", () => {
  bubbleSort();
});

generateCards();
