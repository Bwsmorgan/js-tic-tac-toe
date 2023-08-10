
const gameboardModule = (() => {
    
    const gameboard = [" "," "," "," "," "," "," "," "," "];
    const addToBoard = (symbol, position) => gameboard[position-1] = symbol;
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    return {addToBoard, gameboard, winningCombinations}

})();


const player = (name, symbol) => {
     
    return {name, symbol}

}

const gameController = (() => {

    //CREATE PLAYERS
    const player1 = player('p1', 'X')
    const player2 = player('p1', 'O')


    const box = document.querySelectorAll('.box')

    var turnCount = 0
    var gameSwitch = true
    //If one of our boxes is selected by the user
    box.forEach(element => {

        element.addEventListener('click', function(){
            
            if (gameSwitch == true) {
                console.log(element)
                let boxPosition = element.getAttribute('id')
                let playerSymbol = playersTurn(turnCount)
                selectPosition(boxPosition, playerSymbol)
    
                turnCount += 1    
            }
        })
    });

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


    function selectPosition(currentPosition, currentSymbol) {
    
        const position = document.getElementById(currentPosition)
        console.log(position)

        let symbol = document.createTextNode(currentSymbol);

        //check if position is taken
        checkPosition(currentPosition, currentSymbol) ? position.appendChild(symbol) : position.appendChild(" ")

        console.log(gameboardModule.gameboard)

        gameboardModule.winningCombinations.forEach( winPattern => {
            console.log(`WIN PATTERN!!!!: ${winPattern}`)
            checkForMatch(winPattern)
        })
    }
    
    //WHILE THE GAME HAS NOT ENDED KEEP CHECKIN PLAYERS TURN
    const checkForMatch = pattern => {

        var xcount = 0
        var ocount = 0

        //iterate through each in winningCombinations
        for (i in pattern) {

            let currentMatchIndex = pattern[i]

            if (gameboardModule.gameboard[currentMatchIndex] == 'O'){
                ocount += 1;
            }
            else if (gameboardModule.gameboard[currentMatchIndex] == 'X'){
                xcount += 1;
            }
        }

        console.log(`xcount: ${xcount}`)
        console.log(`ocount: ${ocount}`)

        // At the end of looping through each pattern if the x or o count is equal to 3 it means we have 3 in a row and the game is done
        xcount == 3 ? gameSwitch = gameOver(playersTurn(turnCount)) : xcount = 0
        ocount == 3 ? gameSwitch = gameOver(playersTurn(turnCount)) : ocount = 0
        gameboardModule.gameboard && ()
    }


    function gameOver(winner) {
        //create a pop up to restart game and active buttons
        document.querySelector("#gameOver").style.display = "flex"

        //if count is never 3 and the game is full the draw game
        console.log(winner)
        return false

    }


   

   



    function checkPosition(positionToCheck, symbolToPlace) {

        if (gameboardModule.gameboard[positionToCheck-1] == " "){
            gameboardModule.addToBoard(symbolToPlace, positionToCheck)
            console.log(true)
            return true

        } 
        else {
            console.log(false)
            return false

        }
    }

})();