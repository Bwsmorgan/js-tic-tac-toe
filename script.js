
const gameboardModule = (() => {
    
    const gameboard = [" "," "," "," "," "," "," "," "," "];
    const addToBoard = (symbol, position) => gameboard[position-1] = symbol;
    return {addToBoard, gameboard}

})();


const player = (name, symbol) => {
     
    return {name, symbol}

}

const gameController = (() => {

    //CREATE PLAYERS
    const player1 = player('p1', 'X')
    const player2 = player('p1', 'Y')

    
    
   


    //WHO'S TURN IS IT
    const playersTurn = (count) => {

        if (count % 2 == 0){
            const currentSymbol = 'X'
            console.log(currentSymbol)
            return currentSymbol

        }
        else {
            const currentSymbol = 'O'
            console.log(currentSymbol)
            return currentSymbol


        }
    }
    
    //WHILE THE GAME HAS NOT ENDED KEEP CHECKIN PLAYERS TURN
    

    const box = document.querySelectorAll('.box')

    let turnCount = 0
    //If one of our boxes is selected by the user
    box.forEach(element => {


        element.addEventListener('click', function(){
            
            console.log(element)
            let boxPosition = element.getAttribute('id')

            let playerSymbol = playersTurn(turnCount);

            
            selectPosition(boxPosition, playerSymbol)

            turnCount += 1
            
        })
    });



    

    function selectPosition(currentPosition, currentSymbol) {
    
        // let positionID = currentPosition.getAttribute('data-id')
        const position = document.getElementById(currentPosition)
        console.log()

        let symbol = document.createTextNode(currentSymbol);

        checkPosition(currentPosition) ? position.appendChild(symbol) : position.appendChild(" ")
        
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



})();