const result = document.getElementById('result');
const num = document.getElementById('num');
const button = document.getElementById('btn');

button.addEventListener("mousedown", printMultiplicationTable);

function printMultiplicationTable(){
    var level = num.value;
    console.log(level);
    if(!isNaN(Number(level))){
        var content = "";
        for(var i=1 ; i<10 ; i++){
            content += `${level} * ${i} = ${level*i} <br/>`;
        }
        result.innerHTML = content;
    }else{
        result.innerHTML = "";
        window.alert("숫자를 입력하렴!");
    }
}

