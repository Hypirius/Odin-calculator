const numpad = document.querySelector(".numpad");
const sideNumpad = document.querySelector(".side-numpad");
const display = document.querySelector(".display");

let displayLock = false;

sideNumpadListeners();
numpadListeners();

function numpadListeners() {
  numpad.addEventListener("click", function (event) {
    const clickTarget = event.target;
    clickClasslist = clickTarget.classList;

    if (displayLock) {
      addToSideDisplay(clickTarget, clickClasslist);
      return;
    }

    numpadOperations(clickTarget, clickClasslist);
  });
}
function numpadOperations(clickTarget, clickClasslist) {
  if (clickClasslist.contains("numpad-key")) {
    addDisplay(clickTarget.innerText);
  } else if (clickClasslist.contains("control-buttons-AC")) {
    removeAllDisplay(display);
  } else if (clickClasslist.contains("control-buttons-BK")) {
    removeDisplayElement();
  } else if (clickClasslist.contains("numpad-plus-minus")) {
    valueNegator(display);
  }
}

function sideNumpadListeners() {
  let operator;
  sideNumpad.addEventListener("click", function (event) {
    const operatorTarget = event.target;
    operatorTargetClasslist = operatorTarget.classList;

    if (
      operatorTargetClasslist.contains("side-numpad-block") &&
      !(operatorTarget.getAttribute("data-key") === "=") &&
      display.childNodes.length > 0
    ) {
      lockDisplay();
      operator = operatorTarget.getAttribute("data-key");
    } else if (operatorTarget.getAttribute("data-key") === "=") {
      const sideDisplay = document.querySelector(".side-display");
      const result = CalculateResult(
        display.innerText,
        operator,
        sideDisplay.innerText
      );
      removeAllDisplay(display, sideDisplay);
      addDisplay(result);
      unlockDisplay();
    }
  });
}

function addToSideDisplay(clickTarget, clickClasslist) {
  let sideDisplay = document.querySelector(".side-display");

  if (!sideDisplay) {
    sideDisplay = createSideDisplay();
  }

  if (clickClasslist.contains("numpad-key")) {
    sideDisplay.append(clickTarget.innerText);
  } else if (clickClasslist.contains("numpad-plus-minus")) {
    valueNegator(sideDisplay);
  }
}

function createSideDisplay() {
  const sideDisplay = document.createElement("div");
  sideDisplay.classList.add("side-display");
  numpad.append(sideDisplay);

  return sideDisplay;
}

function lockDisplay() {
  displayLock = true;
}
function unlockDisplay() {
  displayLock = false;
}
function CalculateResult(firstOperand, operator, secondOperand) {
  const operationList = {
    "/": (operand, operand2) => {
      return operand / operand2;
    },
    "*": (operand, operand2) => {
      return operand * operand2;
    },
    "+": (operand, operand2) => {
      return operand + operand2;
    },
    "-": (operand, operand2) => {
      return operand - operand2;
    },
  };
  return operationList[operator](firstOperand, secondOperand);
}

function addDisplay(keyValue) {
  display.append(keyValue);
}

function removeAllDisplay(display, secondDisplay) {
  display.innerText = "";
  if (secondDisplay) {
    secondDisplay.innerText = "";
  }
}

function removeDisplayElement() {
  display.removeChild(display.lastChild);
}

function toggleNegation(signValue, display) {
  const sign = document.createTextNode(signValue);
  display.insertBefore(sign, display.firstChild);
}

function valueNegator(display) {
  try {
    if (display.firstChild.textContent === "-") {
      display.removeChild(display.firstChild);
    } else {
      toggleNegation("-", display);
    }
  } catch {
    console.log("No value to negate");
  }
}
