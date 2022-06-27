var scoreBoard = document.getElementById("score")
var timer = document.getElementById("timer")
var hiddenText = document.getElementById("hidden-word")
var newWordBtn = document.getElementById("new-word-btn")
var endGameMsg = document.getElementById("end-game-msg")

var posWords = ["computer","test","people","phone","mouse"]
var hiddenWord = "password"
var currentGuess = ""
var guessedLetters = []
var secondsLeft = 10
var winCount = 0
var lossCount = 0
var gameOver = false

function chooseWord(){
    hiddenWord = posWords[Math.floor(Math.random() * (posWords.length - 1))]
    updateGuess()
}

function displayWord(){
    var showString = ""
    for(var i = 0; i < currentGuess.length; i++){
        showString += currentGuess.charAt(i) + " "
    }
    hiddenText.textContent = showString
}

function updateGuess(){
    var str = ""
    for(var i = 0; i < hiddenWord.length; i++){
        if(guessedLetters.includes(hiddenWord.charAt(i))){
            str += hiddenWord.charAt(i)
        } else {
            str += "_"
        }
    }
    currentGuess = str
    endGame();
    displayWord();
}

document.addEventListener("keypress", function(event) {
    if(gameOver==false){
        var keyPressed = event.key.toLowerCase();
        if(!(guessedLetters.includes(keyPressed))) {
            guessedLetters.push(keyPressed);
        }  
        updateGuess();
    }
})

newWordBtn.addEventListener("click",function(){
    gameOver = false
    guessedLetters = []
    secondsLeft = 10
    endGameMsg.style.display = "none";
    chooseWord()
    initTimer()
})

function initTimer(){
    var timerInterval = setInterval(function() {
        if(secondsLeft > 0){
            secondsLeft--
            timer.textContent = secondsLeft
        } else {
            clearInterval(timerInterval)
            endGame();
        }
    }, 1000)
}

function endGame() {
    endGameMsg.style.display = "block";
    if(currentGuess == hiddenWord && secondsLeft > 0){
        winCount++
        gameOver = true
        endGameMsg.textContent = "You Win"
        scoreUpdate()
    } else if(currentGuess != hiddenWord && secondsLeft === 0){
        lossCount++
        gameOver = true
        endGameMsg.textContent = "You Lose"
        scoreUpdate()
    }

}

function scoreUpdate(){
    localStorage.setItem("wins",winCount)
    localStorage.setItem("loses",lossCount)
    displayScore()
}

function displayScore(){
    wc = localStorage.getItem("wins")
    lc = localStorage.getItem("loses")
    scoreBoard.textContent = "W: " + wc + " L: " + lc
}

displayScore()