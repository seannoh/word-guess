var scoreBoard = document.getElementById("score")
var timer = document.getElementById("timer")
var hiddenText = document.getElementById("hidden-word")
var newWordBtn = document.getElementById("new-word-btn")

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
    console.log(showString);
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
    if(currentGuess == hiddenWord && secondsLeft > 0){
        winCount++
        gameOver = true
        scoreUpdate()
    }
    displayWord();
}

document.addEventListener("keypress", function(event) {
    if(gameOver==false){
        var keyPressed = event.key.toLowerCase();
        if(!(guessedLetters.includes(keyPressed))) {
            guessedLetters.push(keyPressed);
            console.log(keyPressed);
        }  
        console.log(guessedLetters);
        updateGuess();
    }
})

newWordBtn.addEventListener("click",function(){
    gameOver = false
    guessedLetters = []
    secondsLeft = 10
    chooseWord()
    initTimer()
})

function initTimer(){
    var timerInterval = setInterval(function() {
        if(secondsLeft > 0){
            secondsLeft--
            if(gameOver){
                timer.textContent = "You Win"
            } else {
                timer.textContent = secondsLeft
            }
        } else {
            
            clearInterval(timerInterval)
            if(gameOver==true){
                lossCount++
                timer.textContent = "You Lose"
            }
            gameOver = true
            scoreUpdate()
        }
    }, 1000)
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