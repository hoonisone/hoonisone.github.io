const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");

box1.addEventListener("mousedown", downHanddler);
box2.addEventListener("mousedown", downHanddler);

function downHanddler(e) {
  var preMouseX = e.clientX;
  var preMouseY = e.clientY;

  var element = e.currentTarget;
  element.addEventListener("mousemove", moveHanddler);
  element.addEventListener("mouseup", upHanddler);

  function moveHanddler(e) {
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
