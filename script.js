
const gameboardModule = (() => {
    
    const gameboard = [" "," "," "," "," "," "," "," "," "];
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

    let content = document.createTextNode("X");

    checkPosition(positionID) ? pos.appendChild(content) : pos.appendChild(" ")
    
    console.log(gameboardModule.gameboard)
    
}

function checkPosition(positionToCheck) {

    if (gameboardModule.gameboard[positionToCheck-1] == " "){
        gameboardModule.addToBoard('X', positionToCheck)
        console.log(true)
        return true

    } 
    else {
        console.log(false)
        return false

    }
}