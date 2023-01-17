
let startScreen = document.getElementById("start-screen");
let scores = document.querySelector("scores");
let timer = document.getElementById("time");
let startButton = document.getElementById("start");
let questionsContainer = document.getElementById("questions");
let questionText = document.getElementById("question-title");
let answersContainer = document.getElementById("choices");
let feedback = document.getElementById("feedback");
let endScreen = document.getElementById("end-screen");
let finalScoreSpan = document.getElementById("final-score");
let submitButton = document.getElementById("submit");
let initials = document.getElementById("initials");

let questionsCounter = 0;
let selectedAnswer;

startButton.addEventListener("click", function () {
    startTimer() 
    startGame()
});

let timerInterval;
let secondsLeft = 100;
timer.textContent = secondsLeft;

function startTimer() {
    timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = secondsLeft;
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000)
        
};

function startGame() {
    firstQuestion();
    firstAnswers();
};

function firstQuestion() {
    startScreen.style.display = "none";
    document.body.appendChild(questionsContainer);
    questionsContainer.classList.remove('hide');
    questionsContainer.style = "display: flex; flex-direction: column; justify-content = flex-start";
    questionText.textContent = quizQuestions[0].question;
    questionsContainer.append(questionText);
    questionsCounter++
};

let answerButton;
function firstAnswers() {
    answersContainer.style = "display: flex; flex-direction: column;";
    questionsContainer.appendChild(answersContainer);
    for (let i = 0; i < 4; i++) {
        answerButton = document.createElement("button");
        answerButton.textContent = quizQuestions[0].answers[i];
        answersContainer.appendChild(answerButton);
        answerButton.addEventListener("click", function () {
            if (this.textContent === correctAnswer1) {
                rightFeedback();
            } else {
                wrongFeedback();
                penalty();
            }
            nextQuestion();
            nextAnswers();
        })
    }
}

function nextQuestion() {
    questionText.textContent = quizQuestions[questionsCounter].question;
    questionsContainer.append(questionText);
    questionsCounter++
}

function nextAnswers() {
    answersContainer.innerHTML = '';
    questionsContainer.append(answersContainer);
    for (let i = 0; i < 4; i++) {
        answerButton = document.createElement("button");
        answerButton.textContent = quizQuestions[questionsCounter - 1].answers[i];
        answersContainer.appendChild(answerButton);
        answerButton.addEventListener("click", function () {
            if (this.textContent === correctAnswer2 || this.textContent === correctAnswer3
                || this.textContent === correctAnswer3 || this.textContent === correctAnswer4 ||
                this.textContent === correctAnswer5) {
                rightFeedback();
            } else {
                wrongFeedback();
                penalty();
            }
            if (questionsCounter == 5) {
                gameOver();
            }
            else {
                nextQuestion();
                nextAnswers();
            }
        })
    }
}

function gameOver() {
    clearInterval(timerInterval)
    let result = secondsLeft;
    answersContainer.innerHTML = "";
    questionsContainer.innerHTML = "";
    endScreen.classList.remove("hide");
    finalScoreSpan.textContent = result;
    submitButton.addEventListener("click", function () {
        let winner = initials.value + " - " + result
        scoresArray = JSON.parse(localStorage.getItem("scoresArray")) || []
        scoresArray.push(winner)
        localStorage.setItem("scoresArray", JSON.stringify(scoresArray));
        window.location.href = "highscores.html"
    })
};

function penalty() {
    secondsLeft = timer.textContent = secondsLeft - 10;
};

function wrongFeedback() {
    feedback.classList.remove('hide');
    feedback.classList.add('wrapper')
    feedback.textContent = "Wrong answer!";
    document.body.appendChild(feedback);
    let wrong = new Audio('./assets/sfx/incorrect1.mp3');
    wrong.play();
    setTimeout(function () {
        feedback.classList.add('hide');
    }, 1200);
};

function rightFeedback() {
    feedback.classList.remove('hide');
    feedback.classList.add('wrapper');
    feedback.textContent = "Correct answer!";
    document.body.appendChild(feedback);
    let right = new Audio('./assets/sfx/correct1.mp3');
    right.play();
    setTimeout(function () {
        feedback.classList.add('hide');
    }, 1200);
};