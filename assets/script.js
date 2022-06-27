var scoreBoard = document.getElementById("score")
var timer = document.getElementById("timer")
var hiddenText = document.getElementById("hidden-word")
var newWordBtn = document.getElementById("new-word-btn")

var posWords = ["computer","test","people","phone","mouse"]
var hiddenWord = "password"
var currentGuess = ""
var guessedLetters = []
var secondsLeft = 10

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
    displayWord();
}

document.addEventListener("keypress", function(event) {
  var keyPressed = event.key.toLowerCase();
  if(!(guessedLetters.includes(keyPressed))) {
    guessedLetters.push(keyPressed);
    console.log(keyPressed);
  }  
  console.log(guessedLetters);
  updateGuess();

})

newWordBtn.addEventListener("click",function(){
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
        }
    }, 1000)
}