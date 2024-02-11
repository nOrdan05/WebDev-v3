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
        handleSymbol2(mathAction);
    }
}

function handleSymbol(mathAction) {
    if (mathAction === "=") {
        equalsPressed = true;
        if (checkLastInput(exercise[exercise.length-1]) === true) {
            //console.log(exercise);
            exercise.push(Number.parseInt(currentInput)); //Wenn man clear drückt oder nachdem man plus gedrückt hat und dann gleich wird das hier geaddet! Dann haben wir NaN im Array stehen
            handleCalculationSymbol(exercise[1]);
            //console.log(overallValue);
            printResult(overallValue);
        }
    } else if (mathAction === "C") {
        //console.log("not ready yet");
        clear();
    } else if (mathAction === "←") {
        //console.log("not ready yet");
        goBack();
    } else {
        //console.log("Here");
        exercise.push(Number.parseInt(currentInput));
        if (exercise.length === 3) {
            //console.log("3 lang");
           // console.log(exercise);
            handleCalculationSymbol(exercise[1]);
        }
        exercise.push(mathAction);
        currentInput = "";
        printResult("0");
        //console.log("Done");
    }
}

function handleSymbol2(mathAction) {
    if (mathAction === "=") {
        equalsPressed = true;
        exercise.push(Number.parseInt(currentInput)); //Wenn man clear drückt oder nachdem man plus gedrückt hat und dann gleich wird das hier geaddet! Dann haben wir NaN im Array stehen
        if (currentInput.length !== 0) {
            //console.log(exercise);
            handleCalculationSymbol(exercise[1]);
            //console.log(overallValue);
            printResult(overallValue);
        } else {
            clear();
        }
    } else if (mathAction === "C") {
        //console.log("not ready yet");
        clear();
    } else if (mathAction === "←") {
        //console.log("not ready yet");
        goBack();
    } else {
        //console.log("Here");
        exercise.push(Number.parseInt(currentInput));
        if (exercise.length === 3) {
            //console.log("3 lang");
           // console.log(exercise);
            handleCalculationSymbol(exercise[1]);
        }
        exercise.push(mathAction);
        currentInput = "";
        printResult("0");
        //console.log("Done");
    }
}

function handleCalculationSymbol(mathAction) {
    //console.log(mathAction);
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

// function calculateValue() {
//     let temp = 0;
//     for (let i = 0; i < exercise.length; i++) {
//         if (exercise[2*i+1] === "×") {
//             temp = exercise[i] * exercise[i+2];
//             exercise = exercise.splice(i-1,3);
//             exercise.unshift(temp);
//         } 
//         else if (exercise[2*i+1] === "÷") {
//             temp = exercise[i] / exercise[i+2];
//             exercise = exercise.splice(i-1,3);
//             exercise.unshift(temp);
//         }
//         else {
//             i = i + 2;
//         }  
//     }
//     console.log(exercise);



// }