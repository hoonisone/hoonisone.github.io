const min = document.getElementById("min");
const max = document.getElementById("max");
const box = document.getElementById("box");
const button = document.getElementById("btn");

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setNewRandomValue() {
  button.disabled = true;
  const value = getRandomIntInclusive(min.value, max.value);
  var curValue = value - 100;

  const event = setInterval(() => {
    box.textContent = curValue;
    curValue += 1;
    if (curValue === value) {
      button.disabled = false;
      clearInterval(event);
    }
  }, 1);
}

button.addEventListener("click", setNewRandomValue);
