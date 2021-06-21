const box = document.querySelector('.box');
const bug = document.getElementById('bug');
const point = document.getElementById('point');
const life = document.getElementById('life');
const fullLife = 10;

box.addEventListener("mousedown", downHanddler);

timeEvent = setInterval(moveBug, 1500);

function moveBug(){
    const rangeX = box.offsetWidth - bug.offsetWidth;
    const rangeY = box.offsetHeight - bug.offsetHeight;
    
    const newX = Math.random()*rangeX;
    const newY = Math.random()*rangeY;

    bug.style.left = newX+"px";
    bug.style.top = newY+"px";
    clearTimeout(timeEvent);
    timeEvent = setInterval(moveBug, 1500);
}

function downHanddler(e){
    target = e.target;
    if(target === bug){
        point.innerHTML = Number(point.innerHTML)+1;
        moveBug();
    }else if(target === box){
        life.innerHTML = Number(life.innerHTML)-1;
    }
    if(Number(life.innerHTML) === 0){
        window.alert(`score:${point.innerHTML}\nGameOver!!!` );
        life.innerHTML = fullLife;
        point.innerHTML = 0;
    }
}

