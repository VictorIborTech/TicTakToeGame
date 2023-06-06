const cell = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
    [0, 1, 2,3], // Row to check
    [4, 5, 6,7],
    [8, 9, 10,11],
    [12, 13, 14,15],
    [0, 4, 8,12],   //column to check
    [1, 5, 9,13],
    [2, 6, 10,14],
    [3, 7, 11,15],
    [0, 5, 10,15], //Diagonal
    [3, 6, 9, 12], //Diagonal
   
   
];

let options =["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;


initializeGame();

function initializeGame(){
    cell.forEach(cell =>{
        cell.addEventListener('click', cellClicked);
        restartBtn.addEventListener('click', restartGame)
        statusText.textContent = `${currentPlayer}'s Turn`;
    })
}
function cellClicked(){
    const cellIndex = this.getAttribute('cellIndex');

    if (options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
   
}
function updateCell(cell, index){
    options[index]  = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s Turn`;
    

}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i+=1 ){
        const condition = winConditions[i];
        const cellA =options[condition[0]];
        const cellB =options[condition[1]];
        const cellC =options[condition[2]];
        const cellD =options[condition[3]];
        

        if(cellA == "" || cellB =="" || cellC =="" || cellD ==""){
            continue;
        }
        if (cellA == cellB && cellB == cellC && cellC == cellD){
            roundWon = true;
            break;
        }
    }

    if (roundWon){
        statusText.textContent = `${currentPlayer} WON!!`;
        statusText.style.color = "green";
        statusText.style.fontSize = "30px";
        running = false;
    }
    else if( !options.includes("")){
        statusText.textContent = `DRAW!!!`;
        statusText.style.color = "blue";
        statusText.style.fontSize = "30px";

        running = false;
    }
    else{
        changePlayer();
        

    }
}
function restartGame(){
    currentPlayer = "X";
    options =["", "", "", "", "", "", "", "", "", "", "", "", "", "", "",""];
    statusText.textContent = `${currentPlayer}'s Turn`;
    cell.forEach(cell =>{
        cell.textContent = "";
        running = true;
    });
    statusText.style.color = "black";
    statusText.style.fontSize = "19px";

    


    
}