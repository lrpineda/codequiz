var score = 0;
var timeLeft = 75;
var showTimeEl = document.querySelector("#counter");
var startBtn = document.querySelector("#start-quiz");
var pageContentEl = document.querySelector("#page-content");
var intropageEl = document.querySelector(".intro");
var questionsEl = document.querySelector("#questions");
var answersEl = document.querySelector("#potential-answers");
var questionObj = {
    question: "",
    answers: [],
    realAnswer: ""
}

//Creation of questions
const questions = [
    {
        question: "Conmmonly used data types DO NOT include:",
        choices: ["Strings", "Booleans", "Numbers", "Symbols"],
        correctAnswer:  "alerts"
    }, 
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correctAnswer: "parentheses"

    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: "all of the above"
    }, 
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        correctAnswer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correctAnswer:"console.log"
    }

];

//create a timer function
var timer = function() {
    var timerInterval = setInterval(function() {
        showTimeEl.textContent = "Time:"+timeLeft;
        timeLeft--;
        if(timeLeft == 0){
            clearInterval(timerInterval);
            showTimeEl.textContent = "Time:0";
           
        }
    }, 1000);
};

var hideIntro = function() {
    intropageEl.style.display = "none";
};




//start quiz function
var startQuiz = function() {
    var i = 0;
    var questionEl = document.createElement('section');
    questionEl.className = "questions visible";
    questionEl.innerHTML + 
    
    timer();
    hideIntro();
   

};



//start the quiz
startBtn.addEventListener("click", startQuiz);
