const box_space = document.getElementById('box-space');
const textInput = document.querySelector('.txt');
const img_ref = "https://i.imgur.com/69NjYBH.png"

document.querySelector('.add-red').addEventListener('click', add_red);
document.querySelector('.add-btn').addEventListener('click', add_btn);
document.querySelector('.delete-btn').addEventListener('click', delete_btn);
document.querySelector('.reset-btn').addEventListener('click', reset_btn);
document.querySelector('.text-btn').addEventListener('click', text_btn);
document.querySelector('.toggle-btn').addEventListener('click', toggle_btn);
document.querySelector('.image-btn').addEventListener('click', image_btn);


function add_red(){
    boxs = box_space.children;
    for(var i=0 ; i<boxs.length ; i++){
        const name = boxs[i].className;
        if(name.indexOf("red") == -1){
            boxs[i].className += " red";
        }
    }
}

function add_btn(){
    if(box_space.children.length == 0){
        box_space.appendChild(create_box());
    }else{
        box_space.appendChild(box_space.lastElementChild.cloneNode(true));
    }
}

function create_box(){
    const box = document.createElement('div');
    box.className = "box";
    return box;
}

function delete_btn(){
    if(box_space.childElementCount > 0){
        box_space.removeChild(box_space.lastChild);
    }
}

function reset_btn(){
    while(box_space.childElementCount){
        console.log("hello");
        delete_btn();
    }
}

function text_btn(){
    for(var i=0 ; i<box_space.childElementCount ; i++){
        box_space.children[i].innerHTML += textInput.value;
        console.log("hello");
    }
}

function toggle_btn(){
    if ( typeof toggle_btn.visible == 'undefined' ) {
        toggle_btn.visible = true;
    }
    
    toggle_btn.visible = !toggle_btn.visible;
    box_space.style.display = toggle_btn.visible ? "block" : "none";
}


function image_btn(){// 모든 element에 하나씩 삽입
    if ( typeof image_btn.visible == 'undefined' ) {
        image_btn.visible = false;
    }
    if(box_space.childElementCount == 0){
        add_btn();
    }
    image_btn.visible = ! image_btn.visible;
    if(image_btn.visible){
        for(var i=0 ; i<box_space.childElementCount ; i++){
            box_space.children[i].appendChild(create_img());
        }
    }else{
        for(var i=0 ; i<box_space.childElementCount ; i++){
            box_space.children[i].removeChild(box_space.children[i].lastChild);
        }
    
    }
}

function create_img(){
    const img = document.createElement('img');
    img.src = img_ref;
    return img;
}