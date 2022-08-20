let displayValue = '';
let firstNum;
let secondNum;
let operation;
let previousPressedButton;

let displayDiv = document.getElementById('resultSection');
let buttonClick = document.querySelectorAll('.number');
let operationClick = document.querySelectorAll('.operation');   
let equalClick = document.querySelectorAll('.equalOp')[0];
let clearClick = document.querySelector('.cancel'); 
let signClick = document.querySelector('.sign'); 
let percentClick = document.querySelector('.percent');
//addEventListener does not work on JS objects, only on HTML elements and any other DOM object. 

let OPERATIONCOLOR = "rgb(162,168,50)";

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
        button.style.filter = "brightness(120%)";
        previousPressedButton = button.textContent; // need to specify that the previous button pressed is this number. 

        //For unique case where user divided 0 by 0
        if (displayDiv.textContent === 'ERROR') {
            displayValue = '';
            firstNum = undefined;
            secondNum = undefined;
            operation = undefined; 
            displayDiv.textContent = '0';
        }

        // For case if user tries to click on the "." button but the displayed number already has a period. In which case, do not add the period. Just return here
        if (displayDiv.textContent.includes(".") && button.textContent === '.') {
            return;
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

            // Don't want the number to be too long and exceed calculator width. Set arbitrary max of 15 digits for now 
            if (displayDiv.textContent.length >= 15) {
                return; 
            }
    
            displayDiv.textContent = displayDiv.textContent+button.textContent;
        };
    });

    button.addEventListener("mouseup", () => {
        button.style.filter = "brightness(100%)";
    });
});

operationClick.forEach(op => {
    op.addEventListener('mousedown', () => {
        op.style.filter = "brightness(120%)";
        
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

            // For the situation if the user selects the same operation twice, just perform the same operation where both inputs are equal to what is currently displayed. Because secondNum starts off undefined, if you do not already an output in the display, you would NOT want to change firstNum to be the current display output. Hence why we also need to specify secondNum != undefined. 
            if (previousPressedButton === operation && secondNum != undefined) {
                firstNum = displayDiv.textContent;
            }

            // For situation if previous and current button pressed are different operations, want to do nothing. Just return
            if (['+', '-', '/', '*'].includes(previousPressedButton) && ['+', '-', '/', '*'].includes(op.textContent) && previousPressedButton != op.textContent) {
                 // console.log('YOU ARE CRAZY');
                 return;
            }

            secondNum = displayDiv.textContent;
            displayDiv.textContent = operate(Number(firstNum), operation, Number(secondNum));
            displayValue = displayDiv.textContent;
            operation = op.textContent; // need to change the current operation
        };

        previousPressedButton = operation;
    });

    op.addEventListener("mouseup", () => {
        op.style.filter = "brightness(100%)";
    });
});

// Event listener for equal operation
equalClick.addEventListener('mousedown', () => {
    equalClick.style.filter = "brightness(120%)";

    // If user selects equal sign after an arithmetic, do the same operation on the resulting number. Can just change the firstNum to become the current output, and change the textContent.
    if (displayValue === '' && operation === undefined) {
        firstNum = displayDiv.textContent;
        displayDiv.textContent = secondNum;
        operation = previousPressedButton;
    }

    // If user selects equal sign BEFORE anything is pushed, operation will be undefined. If want display to still be 0, make it so that firstNum and secondNum are both = 0. One solution is to set the operation to '+', so we show 0+0 = 0, which is what we want.
    if (secondNum === undefined && previousPressedButton === undefined) {
        operation = previousPressedButton; 
        //operation = previousOp;
    }

    secondNum = displayDiv.textContent;
    displayDiv.textContent = operate(Number(firstNum), operation, Number(secondNum));
    displayValue = displayDiv.textContent;

    displayValue = '';
    previousPressedButton = operation; 
    operation = undefined;

});

equalClick.addEventListener('mouseup', () => {
    equalClick.style.filter = "brightness(100%)";
});

// Clear button event handler
clearClick.addEventListener('mousedown', () => {
    clearClick.style.filter = "brightness(120%)";
    displayValue = '';
    firstNum = undefined;
    secondNum = undefined;
    operation = undefined; 
    displayDiv.textContent = '0';
});

clearClick.addEventListener('mouseup', () => {
    clearClick.style.filter = "brightness(100%)";
});

// +/- button event handler 
signClick.addEventListener('mousedown', () => {

    signClick.style.filter = "brightness(120%)";

    if (displayDiv.textContent == 0) {
        return;
    };

    if (displayDiv.textContent[0] == '-') {
        displayDiv.textContent= displayDiv.textContent.replace(/-/, "");
    } else {
        displayDiv.textContent = '-' + displayDiv.textContent;
    };
});

signClick.addEventListener('mouseup', () => {
    signClick.style.filter = "brightness(100%)";
});

// Event listener for percent operation
percentClick.addEventListener('mousedown', () => {
    displayDiv.textContent = displayDiv.textContent / 100; 
    percentClick.style.filter = "brightness(120%)";
});

percentClick.addEventListener('mouseup', () => {
    percentClick.style.filter = "brightness(100%)";
});