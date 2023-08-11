
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

    //Query all divs with the class box, each of which represents a free space on the gameboard
    const box = document.querySelectorAll('.box')

    var turnCount = 0
    var gameSwitch = true
    //If one of our boxes is selected by the user
    box.forEach(element => {

        element.addEventListener('click', function(){

            //so long as game switch is true we can make selections
            if (gameSwitch == true) {
                //The position of each box cooresponds to its respective id
                let boxPosition = element.getAttribute('id')
                //based on the turn we can determine what symbol's turn it is to play
                let playerSymbol = playersTurn(turnCount)
                console.log(`this is playerSymbol ${playerSymbol}`)
                selectPosition(boxPosition, playerSymbol)
    
                turnCount += 1    
            }
        })
    });

    //WHO'S TURN IS IT
    const playersTurn = (count) => {

        if (count % 2 == 0){
            const currentSymbol = 'X'
            return currentSymbol
        }
        else {
            const currentSymbol = 'O'
            return currentSymbol
        }   
    }


    function selectPosition(currentPosition, currentSymbol) {
    
        const position = document.getElementById(currentPosition)
        let symbol = document.createTextNode(currentSymbol);

        //if the gameboard has positions open to be selected
        // if (gameboardModule.gameboard.includes(' ')) {

        //Each time the user selects a position we must check if the position is taken 
        checkPosition(currentPosition, currentSymbol) ? position.appendChild(symbol) : position.appendChild(" ")

        //Once it is confirmed that the postion selected is valid me must check if a winning combination has been satisfied after this position has been selected   
        //every() stops iterating through the array whenever the callback function returns a falsy value
        gameboardModule.winningCombinations.every( winPattern => {
            console.log(`WIN PATTERN!: ${winPattern}`)
            checkForMatch(winPattern)
            
        })
    }

    function checkPosition(positionToCheck, symbolToPlace) {

        if (gameboardModule.gameboard[positionToCheck-1] == " "){
            gameboardModule.addToBoard(symbolToPlace, positionToCheck)
            return true

        } 
        else {
            console.log(false)
            return false

        }
    }
    

    //WHILE THE GAME HAS NOT ENDED KEEP CHECKIN PLAYERS TURN
    const checkForMatch = pattern => {

        console.log(pattern)
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


        if (xcount == 3) {
           
            return gameOver(playersTurn(turnCount))
        }

        else if (ocount == 3){

            return gameOver(playersTurn(turnCount))
        }

        else if (!gameboardModule.gameboard.includes(' ')) { 
            return gameOver(playersTurn('Draw'))
            

        }
     
        
    }


    const gameOver = winner => {
        //create a pop up to restart game and active buttons
        const popUp = document.querySelector("#gameOver")
        popUp.style.display = "flex"
        const popUpMsg = popUp.querySelector('#gameOver-Msg')
         
        const drawmessage = "Draw Game!"
        const xomessage = `Congrats player ${winner} is the winner!`


        const win = winner == "Draw" ? popUpMsg.append(`${drawmessage}`) : popUpMsg.append(`${xomessage}`)


        //if count is never 3 and the game is full the draw game
        console.log(win)
        return false

    }


   

   



    

})();