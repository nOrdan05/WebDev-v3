let position = ["first", "second", "third", "fourth", "fifth", "sixth"];

let currentWord = [];
let currentTry = 0; 
let currentChar = 0;

const VALIDATE_WORD_URL = "https://words.dev-apis.com/validate-word";

/*
    Listens for key releases of the user while the window has focus and processes them.
*/
window.addEventListener("keyup", function (event) {
    if (event.key === "Enter") { //Processes when the user presses "Enter"
        console.log("Enter");
        sendWord();
    }
    else if (event.key === "Backspace") { //Processes when the user presses "Backspace"
        console.log("Backspace");
        deleteLastLetter();
    }
    else if (!isLetter(event.key)) { //Ignores all key releases which are not "Enter", "Backspace" or a letter
        console.log("No letter");
    }
    else if (currentTry !== 6) { //Processes when the user presses any letter if the user has not already used all 6 attempts
        console.log("Letter");
        printLetter(event.key, false);
    }
})

/*
    Checks if an input is a letter while not being case sensitive.
*/
function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

/*
    Sends the user's entered word to compare if it is the word of the day
*/
function sendWord() {
    if (currentWord.length === 5) {
        if (currentTry !== 6) {
            currentWord = [];
            currentChar = 0;
            currentTry++;
        }
    }
}

/*
    Deletes the last entered letter by the user or goes back into the previous field, depending if there is a letter present in the current field.
*/
function deleteLastLetter() {
    if (currentWord.length !== currentChar + 1 && currentWord.length > 0) { //When the current field is empty and we are not in the first field of the line
        currentChar--;
    }
    printLetter("", true);
}
/*
    Prints out the last entered letter into the current and adds it to the total word entered by the user.
*/
function printLetter(letter, backspacePressed) {
    let field = document.querySelector(`.${position[currentTry]}-word-${position[currentChar]}-char`);
    field.innerHTML = letter.toUpperCase();
    if (!backspacePressed && currentChar !== 4) { //When the user does not write into the fifth field
        currentWord.push(letter);
        currentChar++;
    }
    else if (!backspacePressed && currentChar === 4) { //When the user writes into the fifth field
        if (currentWord.length === 5) { //When the fifth field was not empty
            console.log("Before removing: " + currentWord.join(""));
            currentWord.pop();
            currentWord.push(letter);
            console.log("After removing: " + currentWord.join(""));
        }
        else { //When the fifth field was empty
            currentWord.push(letter);
        }
    } //When backspace was pressed to delete the letter in the current field
    else if (backspacePressed && currentWord.length !== 0) {
        console.log("Before removing: " + currentWord.join(""));
        currentWord.pop();
        console.log("After removing: " + currentWord.join(""));
    }
}