import { toString } from './board_generator.js';


var numSelected = null; 
var tileSelected = null; 

var errors = 0; 

var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-", 
    "-586----4", 
    "--3----9-", 
    "--62--187", 
    "9-4-7---2", 
    "67-83----", 
    "81--45---"
]

var solution = [
    "387491625", 
    "241568379", 
    "569327418", 
    "758619234", 
    "123784596", 
    "496253187", 
    "934176852", 
    "675832941", 
    "812945763"
]

window.onload = function() {
    setGame(board); 
}

// default board upon loading the window 
function setGame(board) {
        // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div"); 
        number.id = i; 
        number.innerText = i; 
        number.addEventListener("click", selectNumber); 
        number.classList.add("number"); 
        document.getElementById("digits").appendChild(number); 
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div"); 
            tile.id = r.toString() + "-" + c.toString(); 
            if (board[r][c] != "-") {
                tile.innerText = board[r][c]; 
                tile.classList.add("tile-start"); 
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line"); 
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line"); 
            }
            tile.addEventListener("click", selectTile); 
            tile.classList.add("tile"); 
            document.getElementById("board").appendChild(tile); 
        }
    }
}

// when clicking on a number to insert 
function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected"); 
    }
    numSelected = this; 
    numSelected.classList.add("number-selected"); 
}

function selectTile() {
    if(numSelected) {
        if (this.innerText != "") {
            return; 
        }

        let coords = this.id.split("-"); 
        let r = parseInt(coords[0]); 
        let c = parseInt(coords[1]); 

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id; 
        } else {
            errors += 1; 
            document.getElementById("errors").innerText = errors; 
        }
    }
}

// assigns random blank spaces depending on the difficulty 
function randomized_board_difficulty(difficulty) {
    let result = []; 
    let new_solution = toString(); 
    let new_board = JSON.parse(JSON.stringify(new_solution)); 
    let empty_spaces; 

    if (difficulty == "easy") { 
        empty_spaces = Math.floor(Math.random()*6)+36; 
    } else if (difficulty == "medium") {
        empty_spaces = Math.floor(Math.random()*6)+ 48; 
    } else {
        empty_spaces = Math.floor(Math.random()*6)+54; 
    }

    let storage_xy = [];
    let i = 0; 
    while (i < empty_spaces) {
        let x = Math.floor(Math.random() * 9); 
        let y = Math.floor(Math.random() * 9); 
        let coordinate = [x, y]; 
        let isPresent = storage_xy.some(subArray => subArray.length === coordinate.length &&
                                                                        subArray.every((value, index) => value === coordinate[index]))
        if (!isPresent) {
            new_board[x] = new_board[x].substring(0, y) + "-" + new_board[x].substring(y+1, 9); 
            storage_xy.push([x, y]); 
            i++; 
        }
    }
    result.push([new_board, new_solution]);
    return result; 
}

// helper function for difficulty buttons 
function clear_board() {
    errors = 0; 
    document.getElementById("errors").innerText = 0; 
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let tile = document.getElementById(row + "-" + col); 
            tile.innerText = "";  
            tile.classList.remove("tile-start");
        }
    }
}

// function that adds the new numbers to the board when one of the difficulty buttons are clicked 
function new_game(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let tile = document.getElementById(row + "-" + col); 
            if (board[row][col] != "-") {
                tile.innerText = board[row][col]; 
                tile.classList.add("tile-start");
            } else {
                tile.innerText = ""; 
            }
        }
    }
}

// easy, medium, hard button functions 
const easy_button = document.getElementById("easy"); 
const medium_button = document.getElementById("medium"); 
const hard_button = document.getElementById("hard"); 

easy_button.addEventListener('click', function() {
    clear_board(); 
    let set = randomized_board_difficulty("easy"); 
    let board = set[0][0]; 
    solution = set[0][1]; 
    console.log(solution); 
    new_game(board); 
})

medium_button.addEventListener('click', function() {
    clear_board(); 
    let set = randomized_board_difficulty("medium"); 
    let board = set[0][0]; 
    solution = set[0][1]; 
    console.log(solution); 
    new_game(board); 
})

hard_button.addEventListener('click', function() {
    clear_board(); 
    let set = randomized_board_difficulty("hard"); 
    let board = set[0][0]; 
    solution = set[0][1]; 
    console.log(solution); 
    new_game(board); 
})



