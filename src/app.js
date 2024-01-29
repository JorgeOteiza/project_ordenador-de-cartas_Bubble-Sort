// Obtén el contenedor de las cartas
const cardContainer = document.getElementById("cardContainer");

// Función para crear una carta con un valor aleatorio
function createCard(value) {
  const card = document.createElement("div");
  card.classList.add("card-container");

  const cornerSymbolTL = document.createElement("div");
  cornerSymbolTL.classList.add("corner-symbol", "top-left");

  const cornerSymbolBR = document.createElement("div");
  cornerSymbolBR.classList.add("corner-symbol", "bottom-right");

  const centeredText = document.createElement("div");
  centeredText.classList.add("centered-text");
  centeredText.textContent = value;

  card.appendChild(cornerSymbolTL);
  card.appendChild(cornerSymbolBR);
  card.appendChild(centeredText);

  return card;
}

// Función para agregar 13 cartas al contenedor
function addRandomCards() {
  for (let i = 0; i < 13; i++) {
    const value = getRandomNumber();
    const card = createCard(value);
    cardContainer.appendChild(card);
  }

  // Función para generar un número aleatorio entre 1 y 13
  function getRandomNumber() {
    return Math.floor(Math.random() * 13) + 1;
  }
}

// Función para ordenar las cartas con Bubble Sort
function bubbleSort() {
  const cards = Array.from(cardContainer.children);

  for (let i = 0; i < cards.length - 1; i++) {
    for (let j = 0; j < cards.length - i - 1; j++) {
      const cardA = parseInt(
        cards[j].querySelector(".centered-text").textContent
      );
      const cardB = parseInt(
        cards[j + 1].querySelector(".centered-text").textContent
      );

      if (cardA > cardB) {
        // Intercambiar las cartas
        cardContainer.insertBefore(cards[j + 1], cards[j]);
      }
    }
  }
}

// Agrega las cartas al cargar la página y ordena con Bubble Sort
window.onload = () => {
  addRandomCards();
  bubbleSort();
};
