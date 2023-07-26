
const gameboardModule = (() => {
    
    const gameboard = [" "," "," "," "," "," "];
    const addToBoard = (symbol, position) => gameboard[position-1] = symbol;
    return {addToBoard, gameboard}

})();


// const gameController = (() => {

//     makemove
//     updateboard
//     playersturn
//     gameover

// })();

// const player = (name, symbol) => {
//     const move()

// }

function selectPosition(currentPosition) {
 
    let positionID = currentPosition.getAttribute('data-id')
    const pos = document.getElementById(positionID)
    console.log(positionID)
    gameboardModule.addToBoard('X', positionID)
    
    let content = document.createTextNode("X");
    pos.appendChild(content);
    console.log(gameboardModule.gameboard)
    
}