let position = ["first","second","third","fourth","fifth","sixth"];
let currentTry = 0; //We count from 0 to 4
let currentChar = 0;
let test = "Test";

const VALIDATE_WORD_URL = "https://words.dev-apis.com/validate-word";

window.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        console.log("Enter");
        sendWord();
    }
    else if (event.key === "Backspace") {
        console.log("Backspace");
        deleteLastLetter();
    }
    else if (!isLetter(event.key)) {
        console.log("No letter");
    }
    else {
        console.log("Letter");
        printLetter(event.key,false);
    }
})

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

async function getTodaysWord() {
    const promise = await fetch(GET_TODAYS_WORD_URL);
    
}

function sendWord() {

    if (currentChar === 4) {
        if (currentTry !== 5) {
            validateWord();
            currentChar = 0;
            currentTry++;
        }
    }
}

async function validateWord() {
    const promise = await fetch(VALIDATE_WORD_URL, {
        method: "POST",
        body: JSON.stringify({"word":test})
    });
    const processedResponse = await promise.json();
    if (processedResponse.validWord === true) {
        evaluateGuess();
    }
}

function evaluateGuess() {

}

function deleteLastLetter() {
    printLetter("",true);
    if (currentChar !== 0) {
        currentChar--;
    }
}

function printLetter(letter,backspacePressed) {
    let field = document.querySelector(`.${position[currentTry]}-word-${position[currentChar]}-char`);
    field.innerHTML = letter.toUpperCase();

    if (!backspacePressed && currentChar !== 4) {
        currentChar++;
    }

    /* 
    
    Idee ist es so zu mappen, dass man zwei Zahlen hat die immer hochgehen um aus dem Array
    den passenden Index zu wählen, um das passende Feld anzusprechen. Drückt man auf
    Enter wird dann z.B. auch der Zähler für das Wort erhöht. So kann man recht angenehm
    zwischen den Feldern wechseln und diese anwählen durhc einfaches in- und dekrementieren
    der Auswahlzahl.

    */

}