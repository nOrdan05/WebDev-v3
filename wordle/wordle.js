let position = [];
let currentTry = "first";
let currentChar = "first";

window.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        console.log("Enter");
        //sendWord();
    }
    else if (event.key === "Backspace") {
        console.log("Backspace");
        //deleteLastLetter();
    }
    else if (!isLetter(event.key)) {
        console.log("No letter");
    }
    else {
        console.log("Letter");
        printLetter(event.key);
    }
})

// function init() {
//     position = ["first","second","third","fourth","fifth","sixth"];
//     currentTry = 1;
//     currentChar = 1;
// }

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

function printLetter(letter) {
    let test = document.querySelector(`.${currentTry}-word-${currentChar}-char`);
    test.innerHTML = letter.toUpperCase();
    currentChar = "second";

    /* 
    
    Idee ist es so zu mappen, dass man zwei Zahlen hat die immer hochgehen um aus dem Array
    den passenden Index zu wählen, um das passende Feld anzusprechen. Drückt man auf
    Enter wird dann z.B. auch der Zähler für das Wort erhöht. So kann man recht angenehm
    zwischen den Feldern wechseln und diese anwählen durhc einfaches in- und dekrementieren
    der Auswahlzahl.

    */

}