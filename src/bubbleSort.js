/* eslint-disable no-console */

export function bubbleSort(cardTexts, bubbleLog) {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < cardTexts.length - 1; i++) {
      // Compara el elemento actual con el siguiente
      if (compareCards(cardTexts[i], cardTexts[i + 1]) > 0) {
        // Intercambia los elementos si el actual es mayor que el siguiente
        const temp = cardTexts[i];
        cardTexts[i] = cardTexts[i + 1];
        cardTexts[i + 1] = temp;
        swapped = true;
        // Agregamos un console.log para verificar el bubbleLog en cada iteración
        console.log("bubbleLog:", bubbleLog);
        bubbleLog.push([...cardTexts]); // Agregar una copia del arreglo ordenado al bubbleLog
      }
    }
  } while (swapped);
  return cardTexts;
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
  // Implement logic to extract suit from card text (e.g., "♠" for spades)
  return cardText.split("")[0];
}
