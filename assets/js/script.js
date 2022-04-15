var score = 0;
var timeLeft = 75;
var counter = 0;
var showTimeEl = document.querySelector("#counter");
var startBtn = document.querySelector("#start-quiz");
var pageContentEl = document.querySelector("#page-content");
var intropageEl = document.querySelector(".intro");
var highScoreEl = document.querySelector("#high-scores");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

//Creation of questions
const questions = [
  {
    question: "Conmmonly used data types DO NOT include:",
    choices: ["strings", "booleans", "numbers", "alerts"],
    correctAnswer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: "parentheses",
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    correctAnswer: "all of the above",
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    correctAnswer: "quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    correctAnswer: "console.log",
  },
];

//create a timer function
var timer = function () {
  var timerInterval = setInterval(function () {
    showTimeEl.textContent = "Time:" + timeLeft;
    timeLeft--;
    if (timeLeft == 0 || counter >= questions.length) {
      clearInterval(timerInterval);
      showTimeEl.textContent = "Time:0";
    }
  }, 1000);
};

var hideIntro = function () {
  intropageEl.style.display = "none";
};

var quizOver = function () {
    if (score < 0) {
        score = 0;
    }
    var quizOverEl = document.createElement("section");
    quizOverEl.className = "quiz-over";
    var titleEl = document.createElement("h1");
    titleEl.textContent = "All done!";
    var finalScoreEl = document.createElement("p");
    finalScoreEl.textContent = "Your final score is: " + score;
    var scoreSubmissionEl = document.createElement("p");
    scoreSubmissionEl.innerHTML =
    "Enter initials: <input class='input' type='text' /> <button class='form-btn' id='submit'>Submit</button>";
    quizOverEl.appendChild(titleEl);
    quizOverEl.appendChild(finalScoreEl);
    quizOverEl.appendChild(scoreSubmissionEl);
    pageContentEl.appendChild(quizOverEl);
    //submit score
    var submitBtn = document.querySelector("#submit");
    submitBtn.addEventListener("click", storeScores);
    
};

var storeScores = function () {
    var userInitials = document.querySelector(".input").value;
    var userScore = score;
    var userScoreObj = {
        initials: userInitials,
        score: userScore,
    };
    var storedScores = JSON.parse(localStorage.getItem("scores")) || [];
    storedScores.push(userScoreObj);
    localStorage.setItem("scores", JSON.stringify(storedScores));
    highScoreList();
};

var highScoreList = function() {
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    var highScoreEl = document.createElement("section");
    highScoreEl.className = "high-scores";
    var titleEl = document.createElement("h1");
    titleEl.textContent = "High Scores";
    highScoreEl.appendChild(titleEl);
    var highScoreOl = document.createElement("ol");
    highScoreOl.className = "scores-list";
    
    for (var i = 0; i < storedScores.length; i++) {
        var scoreEl = document.createElement("li");
        scoreEl.textContent = storedScores[i].initials + " - " + storedScores[i].score;
        highScoreOl.appendChild(scoreEl);
    }
    highScoreEl.appendChild(highScoreOl);
    pageContentEl.appendChild(highScoreEl);
};

var questionResult = function (id, choice) {
  var checkQuestionEl = document.querySelector("#question");

  var questionResultEl = document.createElement("h2");
  questionResultEl.className = "question-result";

  console.log("Correct Answer: ", questions[id].correctAnswer);
  console.log("Choice was: ", choice);

  if (choice == questions[id].correctAnswer) {
    questionResultEl.textContent = "Correct!";
    checkQuestionEl.appendChild(questionResultEl);
  } else {
    questionResultEl.textContent = "Wrong!";
    checkQuestionEl.appendChild(questionResultEl);
    timeLeft -= 10;
  }
  setTimeout(function () {
    removeQuestion();
    counter++;
    if (counter < questions.length) {
      questionCreator();
    } else {
      score = timeLeft;
      quizOver();
      console.log("Game over?");
      console.log("Score is " + score);
    }
  }, 1000);
};

var choiceHandler = function (event) {
  var targetEl = event.target;

  if (targetEl.matches(".btn") && targetEl.hasAttribute("question")) {
    var questionId = parseInt(targetEl.getAttribute("question"));
    var choice = targetEl.getAttribute("id");
    questionResult(questionId, choice);
  }
};

var removeQuestion = function () {
  var checkQuestionEl = document.querySelector("#question");
  checkQuestionEl.remove();
};

var questionCreator = function () {
  var questionDiv = document.createElement("section");
  questionDiv.setAttribute("id", "question");
  questionDiv.classList.add("questions", "visible");
  var questionEl = document.createElement("h1");
  questionEl.textContent = questions[counter].question;
  var questionChoicesOl = document.createElement("ol");
  questionChoicesOl.className = "choices";
  pageContentEl.appendChild(questionDiv);
  questionDiv.appendChild(questionEl);
  questionDiv.appendChild(questionChoicesOl);

  questions[counter].choices.forEach((element) => {
    var questionChoicesLi = document.createElement("li");
    questionChoicesLi.innerHTML =
      "<button class = 'btn' question = '" +
      counter +
      "' id = " +
      element +
      ">" +
      element +
      "</button>";
    questionChoicesOl.appendChild(questionChoicesLi);
  });
};

//start quiz function
var startQuiz = function () {
  timer();
  hideIntro();

  var i = 0;
  questionCreator();
  pageContentEl.addEventListener("click", choiceHandler);
};

//start the quiz
startBtn.addEventListener("click", startQuiz);

