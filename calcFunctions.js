
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
function operate(operator, a, b) {
    let methods = [add, subtract, multiply, divide]; // each of these are recognized as FUNCTIONS within JS. 
    if (methods.includes(operator)) {
        return operator(a, b);
    }

    // E.g.: with operate(add, 3, 4), the "add" is not recognized as a string, but as a function. 
};