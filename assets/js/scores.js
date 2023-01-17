
let highScoresList = document.getElementById("highscores")
let scoresButtons = document.getElementById("scores-buttons")
let scoresWrapper = document.getElementById("scores-wrapper")
let clear = document.getElementById("clear")

document.body.appendChild(scoresWrapper)
scoresWrapper.style = "display: flex; flex-direction: column"
scoresWrapper.appendChild(highScoresList)
highScoresList.style = "align-items: center; justify-content: flex-start"
scoresWrapper.appendChild(scoresButtons)
scoresButtons.style = "display: flex; flex-direction: row;";

function newScore() {
    let scoresArray = JSON.parse(localStorage.getItem("scoresArray"));
    for (i = 0; i < scoresArray.length; i++) {
        scoreLi = document.createElement("li")
        scoreLi.textContent = scoresArray[i]
        highScoresList.appendChild(scoreLi)
    }
}
newScore()

clear.addEventListener("click", function () {
    highScoresList.innerHTML = ""
    localStorage.clear();
})