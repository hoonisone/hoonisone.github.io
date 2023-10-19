let script_box = document.getElementById('script_box');
let answer_box = document.getElementById('answer_box');

script_box.innerText = "Script"
answer_box.innerText = "Script"

const answer_button = document.getElementById('answer_button');
const prev_button = document.getElementById('prev_button');
const next_button = document.getElementById('next_button');
 
const buttonClickHandler = () =>{
    script_box.innerText = "Undated"
};
 
// const jsonData= require('./students.json'); 
// console.log(jsonData);

fetch("C://word.json")
.then(response => {
   return response.json();
}) 
.then(jsondata => console.log(jsondata));

answer_button.addEventListener('click',buttonClickHandler);
//button.removeEventListener('click', buttonClickHandler);