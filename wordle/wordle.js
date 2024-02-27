const position = ["first", "second", "third", "fourth", "fifth", "sixth"];

const GET_TODAYS_WORD_URL = "https://words.dev-apis.com/word-of-the-day";
const VALIDATE_WORD_URL = "https://words.dev-apis.com/validate-word";

const loadingBar = document.querySelector(".loading-bar")

let currentWord = [];
let currentTry = 0;
let currentChar = 0;

isLoading = false;
gameOver = false;

todaysWord = "";

/*
Load the word of the day when the website is loaded.
*/
window.onload = async function () {
    isLoading = true;
    handleLoading();
    const promise = await fetch(GET_TODAYS_WORD_URL);
    const processedResponse = await promise.json();
    todaysWord = processedResponse.word;
    isLoading = false;
    handleLoading();
}

/*
Listens for key releases of the user while the window has focus and processes them.
*/
window.addEventListener("keyup", function (event) {
    if (!isLoading && !gameOver) { //The website has not to be loading and the game has not to be over
        if (event.key === "Enter") { //Processes when the user presses "Enter"
            sendWord();
        }
        else if (event.key === "Backspace") { //Processes when the user presses "Backspace"
            deleteLastLetter();
        }
        else if (isLetter(event.key)) { //Processes when the user presses any letter
            printLetter(event.key, false);
        }
    }
})

/*
Checks if an input is a letter while not being case sensitive.
*/
function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

/*
Activates or deactives the loading symbol based on if the website is loading something.
*/
function handleLoading() {
    loadingBar.classList.toggle("hidden", !isLoading);
}

/*
Updates the game status if the user won or lost.
*/
function updateGameStatus(status) {
    if (status) {
        for (let i = 0; i < 5; i++) {
            let currentField = document.querySelector(`.${position[currentTry]}-word-${position[i]}-char`);
            currentField.style.backgroundColor = "#006400";
            currentField.style.color = "#FFFFFF";          
        }
        document.querySelector(".heading").classList.add("rainbow-text"); //Rainbow celebration for winning
        gameOver = true; //Setting gameOver to true stops the window from accepting any inputs anymore
        alert("You have won!");
    }
    else {
        gameOver = true;
        alert("All tries done, you lose. The word was " + todaysWord);
    }
}

/*
Sends the user's entered word to compare if it is the word of the day
*/
function sendWord() {
    if (currentWord.length === 5) { //When the word entered by the user has a length of 5 the word is send to be validated
        if (currentTry !== 6) { 
            validateWord(currentWord.join(""));
        }
    }
}

/*
Resets all inputs to be ready for the next word the user enters.
*/
function nextWord() {
    currentWord = [];
    currentChar = 0;
    currentTry++;
}

/*
Validates if a word of a user is a valid English word and evaluates it if it is valid
*/
async function validateWord(word) {
    isLoading = true; //Set isLoading to true, to block any user inputs while validating the word
    handleLoading();
    const promise = await fetch(VALIDATE_WORD_URL, {
        method: "POST",
        body: JSON.stringify({ "word": word })
    });
    const processedResponse = await promise.json();
    if (processedResponse.validWord === true) { //When the word is a valid English word we continue to evaluate the word
        evaluateGuess(word.toLowerCase());
    }
    else { //When the word is not a valid English word we activate a short animation showing the user that the word is wrong
        markWrongWord();
    }
    isLoading = false;
    handleLoading();
}

/*Activating the animation to show the user a entered word is not a valid English word.
*/
function markWrongWord() {
    for (let i = 0; i < 5; i++) {
        document.querySelector(`.${position[currentTry]}-word-${position[i]}-char`).classList.remove("flashing");

        // Browser can repaint without the "flashing class" so we can then add it again
        setTimeout(
            () => document.querySelector(`.${position[currentTry]}-word-${position[i]}-char`).classList.add("flashing"),
            10
        );
    }
}

/*
Evaluates how good the word of the user fits to the word of the day.
*/
function evaluateGuess(word) {
    if (word === todaysWord) { //When the entered word is todays word the user wins
        updateGameStatus(true);
    }
    else { //When the entered word is not todays word we compare them char by char
        for (let i = 0; i < word.length; i++) {
            let currentField = document.querySelector(`.${position[currentTry]}-word-${position[i]}-char`);
            if (word.charAt(i) === todaysWord.charAt(i)) { //Paint the field green if the character of todays word and the character of the entered word match at this position
                currentField.style.backgroundColor = "#006400";
                currentField.style.color = "#FFFFFF";
            }
            else if (todaysWord.includes(word.charAt(i))) { //Paint the field yellow if todays word contains the charcter of the entered word, but at another position
                currentField.style.backgroundColor = "#DAA520";
                currentField.style.color = "#FFFFFF";
            }
            else { //Paint the field grey if todays word does not match or contain the charcter of the entered word
                currentField.style.backgroundColor = "#888888";
                currentField.style.color = "#FFFFFF";
            }
        }
        if (currentTry === 5) { //When it was the sixth try the user loses and todays word is revealed
            updateGameStatus(false);
        }
        else { //When it was not the sixth try the user can go on to enter another word
            nextWord();
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
            currentWord.pop();
            currentWord.push(letter);
        }
        else { //When the fifth field was empty
            currentWord.push(letter);
        }
    } //When backspace was pressed to delete the letter in the current field
    else if (backspacePressed && currentWord.length !== 0) {
        currentWord.pop();
    }
}