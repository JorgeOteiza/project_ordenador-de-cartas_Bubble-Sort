// Optimized JavaScript implementation of Bubble Sort with improvement
export function bubbleSort(arr) {
  var i, j, temp;
  var n = arr.length;
  var swapped;

  // Bucle exterior
  for (i = 0; i < n - 1; i++) {
    swapped = false;

    // Bucle interior
    for (j = 0; j < n - i - 1; j++) {
      // Comprobar si el elemento actual es mayor que el siguiente
      if (arr[j] > arr[j + 1]) {
        // Intercambiar si es necesario
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }

    // Si no hubo intercambios, la matriz está ordenada
    if (!swapped) break;
  }

  return arr; // Devuelve la matriz ordenada
}

// Función para imprimir la matriz
export function printArray(arr) {
  var i;
  for (i = 0; i < arr.length; i++) console.log(arr[i] + " ");
}

// Exporta la función de ordenación
export { displayBubbleLog };

function displayBubbleLog(bubbleLog) {
  console.log("Bubble Log:", bubbleLog);
  const bubbleLogContainer = document.getElementById("bubbleLog");

  // Verificar si bubbleLog está definido y no es un array vacío
  if (!Array.isArray(bubbleLog) || bubbleLog.length === 0) {
    console.error("Invalid bubbleLog provided.");
    return;
  }

  for (let i = 0; i < bubbleLog.length; i++) {
    const currentLogElement = document.createElement("div");
    currentLogElement.classList.add("cards-container");

    // Verificar si el elemento actual en bubbleLog es un array
    if (Array.isArray(bubbleLog[i])) {
      const currentLog = Array.from(bubbleLog[i]);
      currentLog.forEach(currentCard => {
        if (currentCard instanceof Node) {
          currentLogElement.appendChild(currentCard);
        } else {
          console.error("Invalid entry in bubbleLog array.");
        }
      });
    } else {
      console.error("Invalid entry in bubbleLog array.");
    }

    bubbleLogContainer.appendChild(currentLogElement);
  }
}
