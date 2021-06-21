var boardHeight = 4;
var boardWidth = 4;
var board = createChessBoard(boardWidth, boardHeight);

for (var i=0 ; i<board.childElementCount ; i++){
    board.childNodes[i].addEventListener('click', select);
}
document.querySelector("body").appendChild(board);

function createChessBoard(boardWidth, boardHeight){
    var board = document.createElement('board');
    board.className += "board";
    for(var i=0 ; i<boardHeight ; i++){
        for(var j=0 ; j<boardWidth ; j++){
            var square = document.createElement("span");
            square.className += (i%2 === j%2)? "white" : "black";
            board.appendChild(square);
        }
    }
    return board;
}

function select(event){
    if ( typeof select.prevSquare == 'undefined' ) {
        select.prevSquare = null;
        select.prevClass = null;
    }
    if(select.prevSquare){
        select.prevSquare.className = select.prevClass;
    }
    select.prevSquare = event.currentTarget;
    select.prevClass = select.prevSquare.className;

    select.prevSquare.className = "select";


}