document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid")
    const scoreDisplay = document.getElementById("score")
    const width = 28 //28x28 = 784 squares
    let score = 0

    //layout of grid and what is in the squaresx

    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
      ]
    
    //legend
    //0 - pac-dot
    //1 - wall
    //2 - ghost-lair
    //3 - power-pellet
    //4 - empty

    //draw and render the grid

    const squares = []//array of mini divs in the grid

    function createBoard(){
        for (let i = 0; i < layout.length; ++i){
            const square = document.createElement("div")
            grid.appendChild(square)
            squares.push(square)

            //now we style the board based on the number on the layout

            if (layout[i] === 0){
                squares[i].classList.add("pac-dot")//no dot before the class name
                //this add() function is like toggle, but now we are not activating an existing class, we are adding to it
            }
            else if (layout[i] === 1){
                squares[i].classList.add("wall")
            }
            else if (layout[i] === 2){
                squares[i].classList.add("ghost-lair")
            }
            else if (layout[i] === 3){
                squares[i].classList.add("power-pellet")
            }
        }
    
    }
createBoard()
let pacmanCurrentIndex = 490

squares[pacmanCurrentIndex].classList.add("pac-man")

//move pac-man

function movePacman(e){
    squares[pacmanCurrentIndex].classList.remove("pac-man")

    switch (e.keyCode){
        case 37:
            if (pacmanCurrentIndex % width && !squares[pacmanCurrentIndex-1].classList.contains("wall")
            && !squares[pacmanCurrentIndex-1].classList.contains("ghost-lair")){pacmanCurrentIndex--}

            //check if pacman is in left exit
            if (pacmanCurrentIndex -1 === 363){
                pacmanCurrentIndex = 391
            }

            break
        case 38:
            if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex-width].classList.contains("wall")
            && !squares[pacmanCurrentIndex-width].classList.contains("ghost-lair")){pacmanCurrentIndex -= width}
            break
        case 39:
            if (pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex+1].classList.contains("wall")
            && !squares[pacmanCurrentIndex+1].classList.contains("ghost-lair")){pacmanCurrentIndex++}

            //check if pacman is in left exit
            if (pacmanCurrentIndex+1 === 392){
                pacmanCurrentIndex = 364
            }

            break
        case 40:
            if (pacmanCurrentIndex + width < width*width && !squares[pacmanCurrentIndex+width].classList.contains("wall")
            && !squares[pacmanCurrentIndex+width].classList.contains("ghost-lair")){pacmanCurrentIndex += width}
    }
    squares[pacmanCurrentIndex].classList.add("pac-man")
    scoreDisplay.innerHTML = score


    pacDotEaten()
    powerpelletEaten()
    checkForGameOver()
    checkForWin()


}
document.addEventListener("keyup", movePacman)

function pacDotEaten(){
    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")){
        score++
        scoreDisplay.innerHTML = score
        squares[pacmanCurrentIndex].classList.remove("pac-dot")
    }
}

function powerpelletEaten(){
    if (squares[pacmanCurrentIndex].classList.contains("power-pellet")){
        score += 10
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhosts, 10000)
        squares[pacmanCurrentIndex].classList.remove("power-pellet")
    }
}

//function to make ghosts stop flashing
function unScareGhosts(){
    ghosts.forEach(ghost => ghost.isScared = false)
}


class Ghost {
    constructor(className, startIndex, speed){
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.timerId = NaN
        this.isScared = false
    }
}

const ghosts = [
    new Ghost("blinky", 348, 250),
    new Ghost("pinky", 376, 400),
    new Ghost("inky", 351, 300),
    new Ghost("clyde", 379, 500)
]

//draw ghosts onto the grid

ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add("ghost")
})

ghosts.forEach(ghost => moveGhost(ghost))

//function to move ghost

function moveGhost(ghost){
    const directions = [-1, +1, +width, -width]
    let direction = directions[Math.floor(Math.random()*directions.length)]

    ghost.timerId = setInterval(function(){
        //if the next step your ghost is going to does not contain a ghost or a wall, you can go there
        if (!squares[ghost.currentIndex + direction].classList.contains("wall") &&
         !squares[ghost.currentIndex + direction].classList.contains("ghost")){
            //remove the ghost classes in its current square
            squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
            //add ghost to new location
            ghost.currentIndex += direction
            squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
         }
        //else go to another position
        else {
            direction = directions[Math.floor(Math.random()*directions.length)]
        }

        //if the ghost is scared, change the ghosts color
        if (ghost.isScared){
            squares[ghost.currentIndex].classList.add("scared-ghost")
        }
        // if the ghost is scared and pacman runs into it
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains("pac-man")){
            squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
            ghost.currentIndex = ghost.startIndex
            score += 100
            squares[currentIndex].classList.add(ghost.className, "ghost")
        }
        checkForGameOver()
    }, ghost.speed)
}

//check for gameover
function checkForGameOver(){
    if (squares[pacmanCurrentIndex].classList.contains("ghost") &&
     !squares[pacmanCurrentIndex].classList.contains("scared-ghost")){
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener("keyup", movePacman)
        // setTimeout(function(){alert("Game over!")}, 500)
        scoreDisplay.innerHTML = "GAME OVER!"
    }
}

//check for win

function checkForWin(){
    if (score === 274){
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener("keyup", movePacman)
        scoreDisplay.innerHTML = "YOU WIN!"
    }
}




















})