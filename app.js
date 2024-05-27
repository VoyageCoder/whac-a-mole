const squares = document.querySelectorAll('.square')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')
const highScoreDisplay = document.querySelector('#high-score')
const resetButton = document.querySelector('#reset-button')
const gameOverModal = document.querySelector('#game-over-modal')
const closeModal = document.querySelector('#close-modal')
const playAgainButton = document.querySelector('#play-again-button')
const finalScoreDisplay = document.querySelector('#final-score')

let result = 0
let hitPosition
let currentTime = 60
let timerId = null
let countDownTimerId = null
let highScore = 0

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)]
    randomSquare.classList.add('mole')

    hitPosition = randomSquare.id
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
            result++
            score.textContent = result
            hitPosition = null
            square.classList.remove('mole')
            randomSquare()
        }
    })
})

function moveMole() {
    timerId = setInterval(randomSquare, 1000)
}

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime

    if (currentTime == 0) {
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        finalScoreDisplay.textContent = result
        gameOverModal.style.display = 'block'
        if (result > highScore) {
            highScore = result
            highScoreDisplay.textContent = highScore
        }
    }
}

function startGame() {
    result = 0
    score.textContent = result
    currentTime = 60
    timeLeft.textContent = currentTime
    clearInterval(countDownTimerId)
    clearInterval(timerId)
    moveMole()
    countDownTimerId = setInterval(countDown, 1000)
}

resetButton.addEventListener('click', startGame)
closeModal.addEventListener('click', () => {
    gameOverModal.style.display = 'none'
})
playAgainButton.addEventListener('click', () => {
    gameOverModal.style.display = 'none'
    startGame()
})

startGame()
