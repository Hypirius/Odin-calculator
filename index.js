const numpad = document.querySelector(".numpad");
const sideNumpad = document.querySelector(".side-numpad");
const display = document.querySelector(".display");

numpad.addEventListener("click", function (event) {
  const clickTarget = event.target;
  clickClasslist = clickTarget.classList;

  if (clickClasslist.contains("numpad-key")) {
    addDisplay(clickTarget.innerText);
  } else if (clickClasslist.contains("control-buttons-AC")) {
    removeAllDisplay();
  } else if (clickClasslist.contains("control-buttons-BK")) {
    removeDisplayElement();
  } else if (clickClasslist.contains("numpad-plus-minus")) {
    valueNegator();
  }
});

sideNumpad.addEventListener("click", function (event) {

})

function addDisplay(keyValue) {
  display.append(keyValue);
}

function removeAllDisplay() {
  display.innerText = "";
}

function removeDisplayElement() {
  displayChildren = display.childNodes;
  display.removeChild(displayChildren[displayChildren.length - 1]);
}

function toggleNegation(signValue) {
  const sign = document.createTextNode(signValue);
  display.insertBefore(sign, display.childNodes[0]);
}

function valueNegator() {
  try {
    if (display.childNodes[0].textContent === "-") {
      display.removeChild(display.childNodes[0]);
    } else {
      toggleNegation("-");
    }
  } catch {
    console.log("No value to negate");
  }
}
