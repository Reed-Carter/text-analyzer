//Business Logic

function numberOfOccurrencesInText(word, text) {
  const textArray = text.split(" ");
  let wordCount = 0;
  textArray.forEach(function(element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}

function wordCounter(text) {
  if (text.trim().length === 0) {
    return 0;
  }
  let wordCount = 0;
  const textArray = text.split(" ");
  textArray.forEach(function(element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}


function removeWords(text) {
  const textArray = text.split(" ");
  let outputText = "";
  textArray.forEach(function(element) {
    if (!element.toLowerCase().includes("muppeteer") 
    && !element.toLowerCase().includes("biffaroni") 
    && !element.toLowerCase().includes("loopdaloop")) {
      outputText = outputText.concat(" ", element);
    }
      });
  outputText.trim();
  return outputText;
}
