// variables for DOM elements
var scoreBoard = document.getElementById("score")
var timer = document.getElementById("timer")
var hiddenText = document.getElementById("hidden-word")
var newWordBtn = document.getElementById("new-word-btn")
var endGameMsg = document.getElementById("end-game-msg")

// local js variables
var posWords = ["computer","test","people","phone","mouse"]  // array of possible words
var hiddenWord = "password"  // current word chosen
var currentGuess = ""     // string of current guess 
var guessedLetters = []   // array of guessed letters
var secondsLeft = 10      // seconds left in timer
var winCount = 0          // number of wins
var lossCount = 0         // number of losses
var gameOver = true      // bool to keep track of when the game is over

// FUNCTIONS

function initGame(){
  if(!gameOver) return
  gameOver = false
  guessedLetters = []
  secondsLeft = 10
  endGameMsg.style.display = "none";
  console.log(endGameMsg);
  chooseWord()
  initTimer()
}

function initTimer(){
  timer.textContent = secondsLeft
  var timerInterval = setInterval(function() {
      if(gameOver){
        clearInterval(timerInterval)
      }
      if(secondsLeft === 0){
          clearInterval(timerInterval)
          endGame();
      } else {
        secondsLeft--
        timer.textContent = secondsLeft
      }
  }, 1000)
}

function chooseWord(){
    hiddenWord = posWords[Math.floor(Math.random() * (posWords.length))]
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

function handleKeyPress(event) {
  if(gameOver==false){
      var keyPressed = event.key.toLowerCase();
      if(!(guessedLetters.includes(keyPressed))) {
          guessedLetters.push(keyPressed);
      }  
      updateGuess();
  }
}

function endGame() {
    if(currentGuess == hiddenWord && secondsLeft > 0){
        winCount++
        gameOver = true
        endGameMsg.style.display = "block";
        endGameMsg.textContent = "You Win"
        scoreUpdate()
    } else if(currentGuess != hiddenWord && secondsLeft === 0){
        lossCount++
        gameOver = true
        endGameMsg.style.display = "block";
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
    winCount = localStorage.getItem("wins")
    lossCount = localStorage.getItem("loses")
    scoreBoard.textContent = "W: " + winCount + " L: " + lossCount
}

displayScore()

newWordBtn.addEventListener("click",initGame)
document.addEventListener("keypress", handleKeyPress)
