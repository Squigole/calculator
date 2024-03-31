// index.js

const resultDisplay = document.querySelector('.result');
const buttons = document.querySelectorAll('.btn');
let currentValue = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldClearDisplay = false;

function updateDisplay(value) {
  resultDisplay.innerText = value;
}

function clearAll() {
  currentValue = '0';
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
  updateDisplay(currentValue);
}

function appendNumber(number) {
  if (currentValue === '0' || shouldClearDisplay) {
    currentValue = number;
    shouldClearDisplay = false;
  } else {
    currentValue += number;
  }
  updateDisplay(currentValue);
}

function setOperator(operator) {
  if (currentOperator !== null) {
    calculate();
  }
  firstOperand = parseFloat(currentValue);
  currentOperator = operator;
  shouldClearDisplay = true;
}

function calculate() {
  if (currentOperator === null) {
    return;
  }
  secondOperand = parseFloat(currentValue);
  let result;
  switch (currentOperator) {
    case '+':
      result = firstOperand + secondOperand;
      break;
    case '-':
      result = firstOperand - secondOperand;
      break;
    case '*':
      result = firstOperand * secondOperand;
      break;
    case '/':
      if (secondOperand === 0) {
        clearAll();
        updateDisplay('Error');
        return;
      }
      result = firstOperand / secondOperand;
      break;
    default:
      return;
  }
  currentValue = result.toString();
  updateDisplay(currentValue);
  firstOperand = result;
  secondOperand = null;
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.innerText;
    switch (value) {
      case 'AC':
        clearAll();
        break;
      case '+/-':
        currentValue = (-parseFloat(currentValue)).toString();
        updateDisplay(currentValue);
        break;
      case '%':
        currentValue = (parseFloat(currentValue) / 100).toString();
        updateDisplay(currentValue);
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        setOperator(value);
        break;
      case '=':
        calculate();
        break;
      case '.':
        if (!currentValue.includes('.')) {
          currentValue += '.';
          updateDisplay(currentValue);
        }
        break;
      default:
        appendNumber(value);
        break;
    }
  });
});