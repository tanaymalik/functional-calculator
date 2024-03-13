
const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;




const operate = (operator, num1, num2) => operator(num1, num2);

let numberDuo = [];
let signature_signs = [];

let lastButtonClicked = null;
let screen;

// Function to handle number button clicks
function handleNumberButtonClick(button) {
    
    let currentButton = "number";
    
    if (lastButtonClicked === "number") {
        screen.textContent += button.textContent;

    } else if (lastButtonClicked === "null") {
        screen.textContent = button.textContent;
    }

    else {
        screen.textContent = ''
        screen.textContent = button.textContent
    }
    
    lastButtonClicked = currentButton;
   
}

// Function to handle operator button clicks
function handleOperatorButtonClick(button) {
    screen.textContent = ''
    let currentButton = "operator";
    
    screen.textContent += button.textContent;
    
    lastButtonClicked = currentButton;
}
function checker(currentOperator, num1, num2) {
    switch (currentOperator) {
        case "+":
            return operate(add, num1, num2);
        case "-":
            return operate(subtract, num1, num2);
        case "×":
            return operate(multiply, num1, num2);
        case "÷":
            return operate(divide, num1, num2);
        default:
            console.error("Invalid operator:", currentOperator);
            return null;
    }
}



let storage = []



document.addEventListener("DOMContentLoaded", function() {
    screen = document.querySelector(".numberOnScreen");
    solve = document.querySelector(".equalsTo");
    clear = document.querySelector(".clear");
    
    document.querySelectorAll(".digit").forEach(digit => {
        digit.addEventListener("click", function() {
            handleNumberButtonClick(digit);
            
            
        });
    
    });
    
    
    document.querySelectorAll(".operator").forEach(signOperator => {
        signOperator.addEventListener("click", function() {
            signature_signs.push(signOperator.textContent);
           // console.log(signature_signs)
            storage.push(parseInt(screen.textContent))    
           // console.log(storage)
            
            handleOperatorButtonClick(signOperator);
        });
    });

    solve.addEventListener("click", function() {
        storage.push(parseInt(screen.textContent));
        screen.textContent = '';
    
        let result = signature_signs.reduce((acc, currentOperator, i) => {
            let currentElement = acc[0];
            let nextElement = storage[i + 1];
        
            if (i === 0) {
                currentElement = storage[i];
            }
        
            let value = checker(currentOperator, currentElement, nextElement);
            acc.splice(0, 2, value);
        
            return acc;
        }, storage.slice());
        
        screen.textContent = result[0];
    });

    clear.addEventListener("click", function() {
        clear.textContent = 'C'
        screen.textContent = ''
        storage = []
        signature_signs = []
    })



});

    

