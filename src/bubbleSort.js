/* eslint-disable no-console */

export function bubbleSort(cardTexts) {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < cardTexts.length - 1; i += 2) {
      // Compare pairs of cards
      if (compareCards(cardTexts[i], cardTexts[i + 1]) > 0) {
        // Swap elements if the left card is greater
        const temp = cardTexts[i];
        cardTexts[i] = cardTexts[i + 1];
        cardTexts[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
  return cardTexts;
}

function compareCards(cardText1, cardText2) {
  // Implement your logic to compare cards (e.g., by rank and suit)
  // This example prioritizes rank (higher number is greater)
  // and then suit (hearts and diamonds are greater)
  const value1 = getValueFromCardText(cardText1);
  const value2 = getValueFromCardText(cardText2);
  const suit1 = getSuitFromCardText(cardText1);
  const suit2 = getSuitFromCardText(cardText2);

  if (value1 !== value2) {
    return value2 - value1; // Higher value comes first
  } else {
    // If values are equal, compare suits (hearts/diamonds are greater)
    return suit2 === "♥" || suit2 === "♦" ? 1 : -1;
  }
}

function getValueFromCardText(cardText) {
  // Implement logic to extract value from card text (e.g., A=1, J=11)
  if (cardText === "A") return 1;
  else if (cardText.match(/[JQK]/)) return 10;
  else return parseInt(cardText);
}

function getSuitFromCardText(cardText) {
  // Implement logic to extract suit from card text (e.g., "♠" for spades)
  return cardText.split("")[0];
}
