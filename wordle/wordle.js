let position = ["first","second","third","fourth","fifth","sixth"];

let currentWord = [];
let currentTry = 0; //We count from 0 to 4
let currentChar = 0;

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
    else if (currentTry !== 6) {
        console.log("Letter");
        printLetter(event.key,false);
    }
})

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

function sendWord() {
    if (currentWord.length === 5) { 
        if (currentTry !== 6) {
            currentWord = [];
            currentChar = 0;
            currentTry++;
        }
    }
}

function deleteLastLetter() {
    if (currentWord.length !== currentChar+1 && currentWord.length > 0) {
        currentChar--;
    }
    printLetter("",true);
}

function printLetter(letter,backspacePressed) {
    let field = document.querySelector(`.${position[currentTry]}-word-${position[currentChar]}-char`);
    field.innerHTML = letter.toUpperCase();
    if (!backspacePressed && currentChar !== 4) {
        currentWord.push(letter);
        currentChar++;
    }
    else if (!backspacePressed && currentChar === 4) {
        if (currentWord.length === 5) {
            console.log("Before removing: " + currentWord.join(""));
            currentWord.pop();
            currentWord.push(letter);
            console.log("After removing: " + currentWord.join(""));
        }
        else {
            currentWord.push(letter);
        }
    }
    else if (backspacePressed && currentWord.length !== 0) {
        console.log("Before removing: " + currentWord.join(""));
        currentWord.pop();
        console.log("After removing: " + currentWord.join(""));
    }

    /* 
    
    Idee ist es so zu mappen, dass man zwei Zahlen hat die immer hochgehen um aus dem Array
    den passenden Index zu wählen, um das passende Feld anzusprechen. Drückt man auf
    Enter wird dann z.B. auch der Zähler für das Wort erhöht. So kann man recht angenehm
    zwischen den Feldern wechseln und diese anwählen durhc einfaches in- und dekrementieren
    der Auswahlzahl.

    */

}