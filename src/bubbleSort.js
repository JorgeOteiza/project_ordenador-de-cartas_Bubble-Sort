export function bubbleSort(cardTexts) {
  let swapped;
  let log = [];
  do {
    swapped = false;
    for (let i = 0; i < cardTexts.length - 1; i++) {
      if (compareCards(cardTexts[i], cardTexts[i + 1]) > 0) {
        const temp = cardTexts[i];
        cardTexts[i] = cardTexts[i + 1];
        cardTexts[i + 1] = temp;
        swapped = true;

        // Solo registrar si el estado actual es distinto al último en `log`
        if (log.length === 0 || !arraysEqual(log[log.length - 1], cardTexts)) {
          log.push(cardTexts.slice());
        }
      }
    }
  } while (swapped);
  return log;
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function compareCards(cardText1, cardText2) {
  const value1 = getValueFromCardText(cardText1);
  const value2 = getValueFromCardText(cardText2);
  const suit1 = getSuitFromCardText(cardText1);
  const suit2 = getSuitFromCardText(cardText2);

  if (value1 !== value2) {
    return value1 - value2;
  } else {
    // Si los valores son iguales, compara los palos (corazones/diamantes son mayores)
    return suit2 === "♥" || suit2 === "♦" ? 1 : -1;
  }
}

function getValueFromCardText(cardText) {
  // Implementa la lógica para extraer el valor de la carta (por ejemplo, A=1, J=11)
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
  return cardText.split("")[0];
}
