
const gameboardModule = (() => {
    
    let gameboard = [" "," "," "," "," "," "," "," "," "];
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

    getPlayerName : name;
     
    return {name, symbol}

}

const gameController = (() => {

    const startGameBtn = document.getElementById("startGameBtn")
    const firstNameSpan = document.getElementById("first-player-name")
    const secondNameSpan = document.getElementById("second-player-name")

    startGameBtn.addEventListener('click', () => {

         
        const playerX = document.querySelector("#player-x-name").value == '' ? 'Player 1' : document.querySelector("#player-x-name").value
        const playerO = document.querySelector("#player-o-name").value == '' ? 'Player 2' : document.querySelector("#player-o-name").value

        
        firstNameSpan.innerHTML += playerX
        firstNameSpan.style.color = "rgb(82, 9, 115)"
            

        secondNameSpan.innerHTML += playerO

        const startGameBox = document.getElementById("startGame")
        startGameBox.style.display = "none"

        //CREATE PLAYERS
        const player1 = player(playerX,"X")
        const player2 = player(playerO,"O")


        console.log(`name: ${player1.name}`)
        console.log(playerX)
        console.log(playerO)
        console.log(player1)
        console.log(player2)

    })

    
   

    //WHO'S TURN IS IT
    const playersTurn = (count) => {

        if (count % 2 == 0){
            const currentSymbol = 'X'
            firstNameSpan.style.color = "black"
            secondNameSpan.style.color = "rgba(17, 102, 145, 0.985)"
            return currentSymbol
        }
        else {
            const currentSymbol = 'O'
            firstNameSpan.style.color = "rgb(82, 9, 115)"
            secondNameSpan.style.color = "black"
            return currentSymbol
        }   
    }

    const restartBtn = document.getElementById("restartGameBtn")

    restartBtn.addEventListener('click', ()=>{location.reload()})

    //Query all divs with the class box, each of which represents a free space on the gameboard
    const box = document.querySelectorAll('.box')

    let turnCount = 0
    let gameSwitch = true
    //If one of our boxes is selected by the user
    box.forEach(element => {

        element.addEventListener('click', function(){

            //so long as game switch is true we can make selections
            if (gameSwitch == true) {
                //The position of each box cooresponds to its respective id
                
                let boxPosition = element.getAttribute('id')
                // let position = document.getElementById(boxPosition)
                //based on the turn we can determine what symbol's turn it is to play
                let playerSymbol = playersTurn(turnCount)
                console.log(`THIS PLAYER SYMBOL IS: ${playerSymbol}`)
                console.log(boxPosition)
                const pos = checkPosition(boxPosition, playerSymbol) ? selectPosition(boxPosition, playerSymbol) : element.appendChild(" ")

                console.log(`pos: ${pos}`)
                turnCount += 1    
            }
        })
    });


    function checkPosition(positionToCheck, symbolToPlace) {

        if (gameboardModule.gameboard[positionToCheck-1] == " "){
            gameboardModule.addToBoard(symbolToPlace, positionToCheck)
            console.log(gameboardModule.gameboard)
            return true
        } else {
            console.log(false)
            return false
        }
    }



    function selectPosition(currentPosition, currentSymbol) {

        // console.log(`name: ${player1.name}`)
    
        let position = document.getElementById(currentPosition)
        let symbol = document.createTextNode(currentSymbol)

        console.log(`yes: ${currentSymbol == 'X'}`)
        console.log(`yes: ${currentSymbol == 'O'}`)
        
        currentSymbol == 'X' ? position.style.color = "rgb(82, 9, 115)" : position.style.color = "rgba(17, 102, 145, 0.985)"

        position.appendChild(symbol)
        //Once it is confirmed that the postion selected is valid me must check if a winning combination has been satisfied after this position has been selected   
        //every() stops iterating through the array whenever the callback function returns a falsy value
        let declaredWinner = false

        //When a new position is selected we review the gameboard and determine if a match is made
        gameboardModule.winningCombinations.forEach( winPattern => {
            
            console.log(`WIN PATTERN!: ${winPattern}`)
            // console.log("enter while")
            //true means we have a match pattern
            if (checkForMatch(winPattern)){
                declaredWinner = gameOver(playersTurn(turnCount))
            }
        })

        //a full gameboard but no declared winner means there is a draw
        if (!gameboardModule.gameboard.includes(' ') && declaredWinner == false){
            gameOver("Draw")
        }
        // console.log(declaredWinner)
        // declaredWinner = false
        // console.log(declaredWinner)
        return declaredWinner
    }


    //WHILE THE GAME HAS NOT ENDED KEEP CHECKIN PLAYERS TURN
    const checkForMatch = pattern => {

        console.log(pattern)
        let xcount = 0
        let ocount = 0

        //iterate through each index value in winningCombinations
        for (i in pattern) {
        
            //the value in the pattern 
            let currentMatchIndex = pattern[i]
        
            if (gameboardModule.gameboard[currentMatchIndex] == 'O'){
        
                ocount += 1;
            }
            else if (gameboardModule.gameboard[currentMatchIndex] == 'X'){
                xcount += 1;
            }

        }
        console.log(`xcount ${xcount}`)
        console.log(`ocount ${ocount}`)
        return xcount == 3 || ocount == 3 ? true : false
        
    }

    const popUp = document.querySelector("#endGame")

    const gameOver = winner => {
        //create a pop up to restart game and active buttons
        
        popUp.style.display = "flex"
        const popUpMsg = popUp.querySelector('#gameOver-Msg')
         
        const drawmessage = "Draw Game!"
        const xomessage = `Congrats player ${winner} is the winner!`


        winner == "Draw" ? popUpMsg.append(`${drawmessage}`) : popUpMsg.append(`${xomessage}`)

        return true
    }


    document.getElementById('newGameBtn').addEventListener('click', () => {

    
        //Reset gameboard
        console.log(gameboardModule.gameboard)
        
        //Clear gameboard
        const eachBox = document.querySelectorAll(".box")
        //remove all entries from the gameboard
        eachBox.forEach(e => {     
            e.innerHTML = ' '
        })
        //reset the turn count to 0
        turnCount = 0
        gameSwitch = true
        //remove the modal
        popUp.style.display = "none"
        location.reload()
    

    })

    
})();