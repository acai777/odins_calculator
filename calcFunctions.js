let displayValue = '';
let firstNum;
let secondNum;
let operation;

let displayDiv = document.getElementById('resultSection');
let buttonClick = document.querySelectorAll('.number');
let operationClick = document.querySelectorAll('.operation');   
let equalClick = document.querySelectorAll('.equalOp')[0];

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
    //console.log('yo');
    equalClick.style.backgroundColor = "rgb(200,200,200)";
});

equalClick.addEventListener('mouseup', () => {
    //console.log('eh');
    equalClick.style.backgroundColor = "white";
});

console.log(typeof equalClick);


/*
cases:

1) displayValue is empty. So you just entered the first number. so can set firstNum = displayValue. or just change displayValue to keep the first number for now. 

2) displayValue is filled. This means a number has already been acted on. So you need to go ahead and the operation change and return the result. I.e. user entered 5, then pressed the multiply operation, then entered 3, pressed the subtract operation. In which case, we need to first do 5*3 = 15 and show 15 on the screen first. 
*/





/* Strategy: once an operation is hit, store the op somewhere. Also, store the value in the system somewhere */

  
// operationClick.forEach(op => {
//     op.addEventListener('mousedown', () => {








//         if (operation === undefined) {
//             operation = op.innerText;
//             firstNum = displayDiv.innerText;
//         } else {
//             displayDiv.innerText = operate(add, firstNum, secondNum);
//         }






//         operation = op.innerText;
//         if (firstNum === undefined) {
//             firstNum = displayDiv.innerText;
            
//         } else {
//             secondNum = displayDiv.innerText;
//             displayDiv.innerText = operate(add, firstNum, secondNum);
//         }
//         console.log(operation);

//     });
// });