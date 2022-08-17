let firstNum =0;
let secondNum;
let operation;


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
let displayDiv = document.getElementById('resultSection');
let buttonClick = document.querySelectorAll('.number');
buttonClick.forEach(button => {
    button.addEventListener("mousedown", () => {
        button.style.backgroundColor = "rgb(200,200,200)";

        if (displayDiv.innerText === '0') {
            displayDiv.innerText = button.innerText;
        } else {
            displayDiv.innerText = displayDiv.innerText+button.innerText;
        };
    });

    button.addEventListener("mouseup", () => {
        button.style.backgroundColor = "white";
    });
});
//console.log(displayDivValue);






/*
Strategy: 
once an operation is hit, store the op somewhere. Also, store the value in the system somewhere. 
*/

//console.log(firstNum === undefined);

let operationClick = document.querySelectorAll('.operation');   
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