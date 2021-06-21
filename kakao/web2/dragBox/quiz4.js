const box = document.getElementById("box");

box.addEventListener("mousedown", downHanddler);

function downHanddler(e) {
  var preMouseX = e.clientX;
  var preMouseY = e.clientY;

  const element = e.currentTarget;
  element.addEventListener("mousemove", moveHanddler);
  element.addEventListener("mouseup", upHanddler);

  function moveHanddler() {
    element.style.top =
      element.getBoundingClientRect().top + (e.clientY - preMouseY) + "px";
    element.style.left =
      element.getBoundingClientRect().left + (e.clientX - preMouseX) + "px";
    preMouseX = e.clientX;
    preMouseY = e.clientY;
  }

  function upHanddler() {
    element.removeEventListener("mousemove", moveHanddler);
    element.removeEventListener("mouseup", upHanddler);
  }
}
