// Utility Logic

function isEmpty(testString) {
  return (testString.trim().length === 0);
}

// Business Logic

function wordCounter(text) {
  if (isEmpty(text)) {
    return 0;
  }
  let wordCount = 0;
  const textArray = text.split(" ");
  textArray.forEach(function (element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (isEmpty(word)) {
    return 0;
  }
  const textArray = text.split(" ");
  let wordCount = 0;
  textArray.forEach(function (element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}

function removeWords(text) {
  const textArray = text.split(" ");
  let outputText = "";
  textArray.forEach(function (element) {
    if (!element.toLowerCase().includes("muppeteer")
      && !element.toLowerCase().includes("biffaroni")
      && !element.toLowerCase().includes("loopdaloop")) {
      outputText = outputText.concat(" ", element);
    }
  });
  outputText.trim();
  return outputText;
}

function uniqueWords(text) {
  const uniqueWords = [];
  const textArray = text.split(" ");

  textArray.forEach(function (element) {
    if (!uniqueWords.includes(element.toLowerCase())) {
      uniqueWords.push(element.toLowerCase());
    }
  });
  return uniqueWords;
}

function inputSort(text) {
  const words = uniqueWords(text);
  console.log(words.toString());
  const occurences = [];
  const sortedWords = [];
  words.forEach(function (element) {
    const occurence = numberOfOccurrencesInText(element, text);
    console.log(element + ": " + occurence);
    let valueAdded = false;
    
    if (occurences.length === 0) {
      occurences.push(occurence);
      sortedWords.push(element);
    }
    else {
      occurences.forEach(function (j, index) {
        if (!valueAdded) {
          if (occurence > j) {
            occurences.splice(index, 0, occurence);
            sortedWords.splice(index, 0, element);
            valueAdded = true;
          }
          else if (index === occurences.length - 1) { //if at last index, insert at the end
            occurences.push(occurence);
            sortedWords.push(element);
          }
        }
      });
    }
  });

  return [sortedWords, occurences];
}

// UI Logic
function boldPassage(word, text) {
  if (isEmpty(word) || isEmpty(text)) {
    return null;
  }
  const p = document.createElement("p");
  let textArray = text.split(" ");
  textArray.forEach(function (element, index) {
    if (word === element) {
      const bold = document.createElement("strong");
      bold.append(element);
      p.append(bold);
    } else {
      p.append(element);
    }
    if (index !== (textArray.length - 1)) {
      p.append(" ");
    }
  });
  return p;
}

function addUpWords(text) {
  let output = inputSort(text);
  let p = document.createElement("p");
  console.log(output[0].toString());
  console.log(output[1].toString());

  output[0].forEach(function (element, index) {
    p.append(element + ": " + output[1][index]);
    p.append(document.createElement("br"));
  });
  return p;
}

function handleFormSubmission() {
  event.preventDefault();
  const passage = document.getElementById("text-passage").value;
  const word = document.getElementById("word").value;
  const wordCount = wordCounter(passage);
  const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
  document.getElementById("total-count").innerText = wordCount;
  document.getElementById("selected-count").innerText = occurrencesOfWord;
  let boldedPassage = boldPassage(word, passage);
  if (boldedPassage) {
    document.querySelector("div#bolded-passage").append(boldedPassage);
  } else {
    document.querySelector("div#bolded-passage").innerText = null;
  }
  let outputText = addUpWords(passage);
  document.getElementById("counted-words").append(outputText);
}

window.addEventListener("load", function () {
  document.querySelector("form#word-counter").addEventListener("submit", handleFormSubmission);
});