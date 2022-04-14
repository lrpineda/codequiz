var score = 0;
var timeLeft = 75;
var showTimeEl = document.querySelector("#counter");
var startBtn = document.querySelector("#start-quiz");
var pageContentEl = document.querySelector("#page-content");
var intropageEl = document.querySelector(".intro");
const delay = ms => new Promise(res => setTimeout(res, ms));




//Creation of questions
const questions = [
    {
        question: "Conmmonly used data types DO NOT include:",
        choices: ["strings", "booleans", "numbers", "alerts"],
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
var questionResult = function(id, choice) {
    var checkQuestionEl = document.querySelector("#question");
    
    var questionResultEl = document.createElement('h2');
    questionResultEl.className = "question-result";

    console.log("Correct Answer: ",questions[id].correctAnswer);
    console.log("Choice was: ",choice);

    if(choice == questions[id].correctAnswer) {
        questionResultEl.textContent = "Correct!";
        checkQuestionEl.appendChild(questionResultEl);
        
    } else{
        questionResultEl.textContent = "Wrong!";
        checkQuestionEl.appendChild(questionResultEl);
    }
    setTimeout(function(){
        removeQuestion();
    },1000);
    

};

var choiceHandler = function (event){
    var targetEl = event.target;
    
    if (targetEl.matches('.btn') && targetEl.hasAttribute('question')){
        var questionId = parseInt(targetEl.getAttribute('question')); 
        var choice = targetEl.getAttribute('id');
        questionResult(questionId, choice);
    }

    
    
}

var removeQuestion = function() {
    var checkQuestionEl = document.querySelector("#question")
    checkQuestionEl.remove();
}

//start quiz function
var startQuiz = function() {
    timer();
    hideIntro();
    var i = 0;
    var questionDiv = document.createElement('section');
    questionDiv.setAttribute("id","question")
    questionDiv.classList.add("questions","visible")  ;
    var questionEl = document.createElement('h1');
    questionEl.textContent = questions[i].question;
    var questionChoicesOl = document.createElement('ol');
    questionChoicesOl.className = "choices";
    pageContentEl.appendChild(questionDiv);
    questionDiv.appendChild(questionEl);
    questionDiv.appendChild(questionChoicesOl);
    
    questions[i].choices.forEach(element => {
        var questionChoicesLi = document.createElement('li')
        questionChoicesLi.innerHTML = "<button class = 'btn' question = '" + i + "' id = " + element + ">"+element+ "</button>"
        // questionChoicesLi.setAttribute("question", i);
        questionChoicesOl.appendChild(questionChoicesLi);
    });

    pageContentEl.addEventListener("click", choiceHandler);

    

};



//start the quiz
startBtn.addEventListener("click", startQuiz);
