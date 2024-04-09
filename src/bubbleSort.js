// Definimos la función bubbleSort para ordenar las cartas y registrar los cambios en el bubble log
export function bubbleSort(cardTexts) {
  // Inicializamos el bubble log como un array vacío al comienzo
  const bubbleLog = [];

  const len = cardTexts.length;
  let swapped;

  do {
    swapped = false;

    for (let i = 0; i < len; i++) {
      if (cardTexts[i] > cardTexts[i + 1]) {
        const temp = cardTexts[i];
        cardTexts[i] = cardTexts[i + 1];
        cardTexts[i + 1] = temp;

        // Antes de realizar el intercambio, agregamos una copia del array actual al bubble log
        bubbleLog.push([...cardTexts]);

        swapped = true;
      }
    }
  } while (swapped);

  // Devolvemos tanto el array ordenado como el bubble log
  return { sortedCards: cardTexts, bubbleLog };
}

function compareCards(cardText1, cardText2) {
  const value1 = getValueFromCardText(cardText1);
  const value2 = getValueFromCardText(cardText2);
  const suit1 = getSuitFromCardText(cardText1);
  const suit2 = getSuitFromCardText(cardText2);

  if (value1 !== value2) {
    return value1 - value2; // El valor más bajo viene primero
  } else {
    // Si los valores son iguales, compara los palos (corazones/diamantes son mayores)
    return suit2 === "♥" || suit2 === "♦" ? 1 : -1;
  }
}

function getValueFromCardText(cardText) {
  // Implementa la lógica para extraer el valor de la carta del texto (por ejemplo, A=1, J=11)
  switch (cardText) {
    case "A":
      return 1;
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    default:
      return parseInt(cardText);
  }
}

function getSuitFromCardText(cardText) {
  // Implementa logic para extraer suit from card text (e.g., "♠" para spades)
  return cardText.split("")[0];
}
