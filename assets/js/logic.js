//Variables referencing html elements
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

//Variables in global scope
let questionsCounter = 0;
let selectedAnswer;

//Start button with a event listener attached
//It starts the timer and activates the startGame function which displays the first question
startButton.addEventListener("click", function () {
    startTimer() //starts timer on button click
    startGame()
});

//Timer function counts down from defined number
//Ends game if timer runs down to 0
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

//Function starting the game containing other functions controlling the game
function startGame() {
    firstQuestion();
    firstAnswers();
};

// Function displaying the first questions. 
// First it hides the start page
//Then it creates a div for question and answers
//Then it sets the css properties of that div
//Then it appends the new div to the doc body
//Then it sets the question text to the text
//Then it appends question text to the questions div
//Then it adds 1 to the variable counting the questions
function firstQuestion() {
    startScreen.style.display = "none";
    document.body.appendChild(questionsContainer);
    questionsContainer.classList.remove('hide');
    questionsContainer.style = "display: flex; flex-direction: column; justify-content = flex-start";
    questionText.textContent = quizQuestions[0].question;
    questionsContainer.append(questionText);
    questionsCounter++
};

// Function to display the first set of answers
// First it creates a div container for answers
// It then uses a for loop to make buttons and assign them answers from the quizQuestions array
// It then appends these buttons to answers container
// It then adds eventListeners to button which check if the selected answer is correct
// It then penalizes the player if it's not
// It then proceeds to the next question 
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

//This function replaces previous question text with next question text
function nextQuestion() {
    questionText.textContent = quizQuestions[questionsCounter].question;
    questionsContainer.append(questionText);
    questionsCounter++
}

//This function replaces previous answers with next answers. 
//If final question answered, it finishes the game.
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

//Function finishing the game
//It stops the timer and assigns its value to results variable
//It displays game end screen with the result displayed
//It takes user initials input and assigns it to variable alongside result
// I then stories the result in local memory
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

// Function penalizing the player for wrong answer be removing seconds 
function penalty() {
    secondsLeft = timer.textContent = secondsLeft - 10;
};

//Functions displaying and sounding feedback on answer submission
function wrongFeedback() {
    feedback.classList.remove('hide');
    feedback.classList.add('wrapper')
    feedback.textContent = "Wrong answer!";
    document.body.appendChild(feedback);
    let wrong = new Audio('./assets/sfx/incorrect.wav');
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
    let right = new Audio('./assets/sfx/correct.wav');
    right.play();
    setTimeout(function () {
        feedback.classList.add('hide');
    }, 1200);
};