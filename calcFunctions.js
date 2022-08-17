let displayValue = '';
let firstNum;
let secondNum;
let operation;
let previousOp;


let displayDiv = document.getElementById('resultSection');
let buttonClick = document.querySelectorAll('.number');
let operationClick = document.querySelectorAll('.operation');   
let equalClick = document.querySelectorAll('.equalOp')[0];
let clearClick = document.querySelector('#cancel'); // addEventListener does not work on JS objects, only on HTML elements and any other DOM object. 

//ADD
function add(a, b) {
    return a+b;
};

//SUBSTRACT
function subtract(a, b) {
    return a-b; 
};

//MULTIPLY 
function multiply(a, b) {
    return a*b; 
}

//DIVIDE 
function divide(a, b) {
    if (a == 0 && b == 0) {
        return 'ERROR';
    }
    return a/b; 
};

// operate function. takes an operator and 2 numbers and then executes the functions on the two numbers
function operate(a, operator, b) {
    if (operator == '+') {
      return add(a, b)  // calls the function add(a, b) 
    }
    else if (operator == '-') {
      return subtract(a, b)
    }
    else if (operator == '*') {
      return multiply(a, b) 
    }
    else if (operator == '/') {
        return divide(a, b)
      } 
    else {
      return null; 
    } 
  };
  
// Create the functions that populate the display when you click the number buttons. Store the ‘display value’ in a variable somewhere.
buttonClick.forEach(button => {
    button.addEventListener("mousedown", () => {
        button.style.backgroundColor = "rgb(200,200,200)";

        //For unique case where user divided 0 by 0
        if (displayDiv.textContent === 'ERROR') {
            displayValue = '';
            firstNum = undefined;
            secondNum = undefined;
            operation = undefined; 
            displayDiv.textContent = '0';
        }

        // Resets display value to become empty
        if (displayValue != '') {
            firstNum = displayValue;
            displayValue = '';
            displayDiv.textContent = '';
        };

        if (displayDiv.textContent === '0') {
            displayDiv.textContent = button.textContent;
        } else {
            displayDiv.textContent = displayDiv.textContent+button.textContent;
        };
    });

    button.addEventListener("mouseup", () => {
        button.style.backgroundColor = "white";
    });
});

operationClick.forEach(op => {
    op.addEventListener('mousedown', () => {
        op.style.backgroundColor = "rgb(200,200,200)";
        
        //For unique case where user divided 0 by 0. Have this code because do not want display to show 'NaN'. Instead, want to essentially "cancel" and reset.
        if (displayDiv.textContent === 'ERROR') {
            displayValue = '';
            firstNum = undefined;
            secondNum = undefined;
            operation = undefined; 
            displayDiv.textContent = '0';
        }

        if (operation === undefined) {
            operation = op.textContent;

            if (displayValue === '') {
                displayValue = displayDiv.textContent;
            } else {
                secondNum = displayDiv.textContent;
                displayDiv.textContent = operate(Number(firstNum), operation, Number(secondNum));
                displayValue = displayDiv.textContent;
            }
        } else {

            // Need this for the odd situation where user presses the divide sign >=2 times. 
            if (firstNum === undefined) {
                firstNum = 0;
            }

            secondNum = displayDiv.textContent;
            displayDiv.textContent = operate(Number(firstNum), operation, Number(secondNum));
            displayValue = displayDiv.textContent;
            operation = op.textContent; // need to change the current operation
        };

        
    });

    op.addEventListener("mouseup", () => {
        op.style.backgroundColor = "white";
    });
});

// Event listener for equal operation
equalClick.addEventListener('mousedown', () => {
    equalClick.style.backgroundColor = "rgb(200,200,200)";

    // If user selects equal sign after an arithmetic, do the same operation on the resulting number. Can just change the firstNum to become the current output, and change the textContent.
    if (displayValue === '' && operation === undefined) {
        firstNum = displayDiv.textContent;
        displayDiv.textContent = secondNum;
        operation = previousOp;
    }

    secondNum = displayDiv.textContent;
    displayDiv.textContent = operate(Number(firstNum), operation, Number(secondNum));
    displayValue = displayDiv.textContent;

    displayValue = '';
    previousOp = operation; 
    operation = undefined;

});

equalClick.addEventListener('mouseup', () => {
    equalClick.style.backgroundColor = "white";
});

// Clear button event handler
clearClick.addEventListener('mousedown', () => {
    clearClick.style.backgroundColor = "rgb(200,200,200)";
    displayValue = '';
    firstNum = undefined;
    secondNum = undefined;
    operation = undefined; 
    displayDiv.textContent = '0';
});

clearClick.addEventListener('mouseup', () => {
    clearClick.style.backgroundColor = "white";
});
