let script_box = document.getElementById('script_box');
let answer_box = document.getElementById('answer_box');

const answer_button = document.getElementById('answer_button');
const prev_button = document.getElementById('prev_button');
const next_button = document.getElementById('next_button');
const index_view = document.getElementById('index_view');
var slider = document.getElementById("range_slider");
 
const buttonClickHandler = () =>{
    script_box.innerText = "Undated"
};
var idx = 0
var len = 0
var contents = null
// const jsonData= require('./students.json'); 
// console.log(jsonData);
const headers = new Headers({
    'Content-Type': 'text/xml',
  });

fetch("https://hoonisone.github.io/word_note/word.json")
.then(response => {
   return response.json();
}) 
.then(jsondata => {
    contents = jsondata
    len = jsondata.length
    new_content(idx)
    
});

answer_button.addEventListener('click', show_answer);
prev_button.addEventListener('click',prev);
next_button.addEventListener('click',next);
//button.removeEventListener('click', buttonClickHandler);

function new_content(idx){
    script_box.textContent = contents[idx]["Script"]
    answer_box.textContent = ""
    index_view.innerHTML = `${idx+1}/${len}`
}

function set_answer(idx){
    answer_box.textContent = maks_answer_script(contents[idx]["Words"])
}

function show_answer(){
    set_answer(idx)
}

function next(){
    if(contents == null)
        return;

    idx = (idx+1)%len;
    new_content(idx);
}

function prev(){
    if(contents == null)
        return;

    idx = (idx+len-1)%len;
    new_content(idx);
}

function maks_answer_script(words){
    var answer = ""
    for (var x in words){
        word = words[x][0]
        meaning = words[x][1]
        answer += `${word}: ${meaning}\n`
    }
    return answer
}

slider.oninput = function() {
    idx = parseInt(this.value/100*(len-1))
    new_content(idx)
}