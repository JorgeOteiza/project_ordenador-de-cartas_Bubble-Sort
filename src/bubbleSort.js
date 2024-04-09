/* eslint-disable no-console */

export function bubbleSort(cardTexts) {
  const n = cardTexts.length;
  let swapped;
  const bubbleLog = [];

  // Realiza el bubble sort
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      // Compara el elemento actual con el siguiente
      if (compareCards(cardTexts[j], cardTexts[j + 1]) > 0) {
        // Intercambia los elementos si el actual es mayor que el siguiente
        const temp = cardTexts[j];
        cardTexts[j] = cardTexts[j + 1];
        cardTexts[j + 1] = temp;
        swapped = true;
      }
    }
    // Agrega una copia del arreglo ordenado al bubbleLog después de cada pasada
    bubbleLog.push([...cardTexts]);
    // Si no hubo intercambios en esta pasada, el arreglo está ordenado y podemos salir del bucle
    if (!swapped) break;
  }
  return bubbleLog;
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
