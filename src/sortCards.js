export function bubbleSortCards() {
  const [cardsContainer] = document.querySelectorAll(".card-row");
  debugger;
  const allCards = Array.from(cardsContainer.children);

  const sortedCards = bubbleSort(allCards);
  cardsContainer.innerHTML = "";
  sortedCards.forEach(card => {
    cardsContainer.appendChild(card);
  });

  displayChangeLog();
}

// Bubble sort Implementation using Javascript

// Creating the bblSort function
function bblSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    // Generar copia del arreglo y agregarlo al log

    // Last i elements are already in place
    for (var j = 0; j < arr.length - i - 1; j++) {
      // Checking if the item at present iteration
      // is greater than the next iteration
      if (arr[j] > arr[j + 1]) {
        // If the condition is true
        // then swap them
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  // Print the sorted array
  console.log(arr);
}

function bubbleSort(elementList) {
  const arrayNumbers = elementList.map(el => {
    const value = el.querySelector(".centered-text").innerHTML;
    if (value === "J") return 10;
    else if (value === "Q") return 11;
    else if (value === "K") return 12;
    else if (value === "A") return 1;
    else return Number(value);
  });

  bblSort(arrayNumbers);

  return elementList;
}

function displayChangeLog() {}
