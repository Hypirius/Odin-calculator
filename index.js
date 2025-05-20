const numpad = document.querySelector(".numpad");
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
  }
});

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
