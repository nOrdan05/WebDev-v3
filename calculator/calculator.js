let overallValue = 0;
let currentInput = "";
let exercise = [];
let equalsPressed = false;

const wholeCalculator = document.querySelector(".calculator");
wholeCalculator.addEventListener("click", function (event) {
    if (event.target.tagName.toLowerCase() === "div") {
        //console.log("This is the result field.");
    } else {
        calculate(event.target.innerText);
    }
});

function calculate(mathAction) {
    let parsedInput = Number.parseInt(mathAction);
    if (equalsPressed === true) {
        overallValue = 0;
        currentInput = "";
        exercise = [];
        equalsPressed = false;
    }
    if (isNaN(parsedInput) === false) {
        currentInput += parsedInput;
        printResult(currentInput);
    } else {
        handleSymbol(mathAction);
    }
}

function handleSymbol(mathAction) {
    if (mathAction === "=") {
        exercise.push(Number.parseInt(currentInput));
        if (checkLastInput(exercise[exercise.length-1]) && exercise.length === 3) { //When you enter a number and press equals sign it will throw NaN in the result field
            handleCalculationSymbol(exercise[1]);
            printResult(overallValue);
            equalsPressed = true;
        }
        console.log(exercise);
    } else if (mathAction === "C") {
        clear();
    } else if (mathAction === "←") {
        goBack();
    } else {
        exercise.push(Number.parseInt(currentInput));
        if (exercise.length === 3) {
            handleCalculationSymbol(exercise[1]);
        }
        exercise.push(mathAction);
        currentInput = "";
        printResult("0");
    }
}

function handleCalculationSymbol(mathAction) {
    printResult("0");
    if (mathAction === "+") {
        overallValue = exercise[0] + exercise[2];
        exercise = [];
        exercise[0] = overallValue;
    } else if (mathAction === "-") {
        overallValue = exercise[0] - exercise[2];
        exercise = [];
        exercise[0] = overallValue;
    } else if (mathAction === "×") {
        overallValue = exercise[0] * exercise[2];
        exercise = [];
        exercise[0] = overallValue;
    } else {
        overallValue = exercise[0] / exercise[2];
        exercise = [];
        exercise[0] = overallValue;
    }
}

function checkLastInput(val) {
    if (isNaN(val) === true) {
        overallValue = 0;
        currentInput = "";
        exercise = [];
        equalsPressed = false;
        return false;
    }
    return true;
}

const resultField = document.querySelector(".result");
function printResult(text) {
    resultField.innerText = text;
}

function clear() {
    overallValue = 0;
    currentInput = "";
    exercise = [];
    printResult("0");
}

function goBack() {
    if (currentInput.length === 1 || currentInput.length === 0) {
        currentInput = "";
        printResult("0");
    } else {
        currentInput = currentInput.substring(0,currentInput.length-1);
        printResult(currentInput);
    }
}