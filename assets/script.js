var scoreBoard = document.getElementById("score")
var timer = document.getElementById("timer")
var hiddenWord = document.getElementById("hidden-word")
var newWordBtn = document.getElementById("new-word-btn")

var posWords = ["computer","test","people","phone","mouse"]
var hiddenWord = "                           "
var currentGuess = ""
var guessedLetters = []

function chooseWord(){
    var hiddenWord = posWords[Math.floor(Math.random() * (posWords.length - 1))]
}

function displayWord(){
    var showString = ""
    for(var i = 0; i < currentGuess.length; i++){
        showString += currentGuess.charAt(i) + " "
    }
    hiddenWord.textContent = showString
}

