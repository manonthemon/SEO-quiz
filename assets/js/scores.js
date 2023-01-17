
//Variables referencing elements of the HTML file
let highScoresList = document.getElementById("highscores")
let scoresButtons = document.getElementById("scores-buttons")
let scoresWrapper = document.getElementById("scores-wrapper")
let clear = document.getElementById("clear")

//This adds a container with high scores list to the page
document.body.appendChild(scoresWrapper)
scoresWrapper.style = "display: flex; flex-direction: column"
//Appends OL with high scores to wrapper and set its style
scoresWrapper.appendChild(highScoresList)
highScoresList.style = "align-items: center; justify-content: flex-start"

//Append buttons to the wrapper and sets style
scoresWrapper.appendChild(scoresButtons)
scoresButtons.style = "display: flex; flex-direction: row;";

//Function retrieving the up to date winners list from the local storage and adding it to the OL list.
function newScore() {
    let scoresArray = JSON.parse(localStorage.getItem("scoresArray"));
    for (i = 0; i < scoresArray.length; i++) {
        scoreLi = document.createElement("li")
        scoreLi.textContent = scoresArray[i]
        highScoresList.appendChild(scoreLi)
    }
}
newScore()

//Function clearing the list of winners and clearing local storage
clear.addEventListener("click", function () {
    highScoresList.innerHTML = ""
    localStorage.clear();
})