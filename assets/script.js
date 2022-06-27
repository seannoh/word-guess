var scoreBoard = document.getElementById("score")
var timer = document.getElementById("timer")
var hiddenWord = document.getElementById("hidden-word")
var newWordBtn = document.getElementById("new-word-btn")

var posWords = ["computer","test","people","phone","mouse"]
var hiddenWord = "                           "

function chooseWord(){
    var hiddenWord = posWords[Math.floor(Math.random() * (posWords.length - 1))]
}