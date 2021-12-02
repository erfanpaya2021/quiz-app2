const finalScore = document.querySelector("#final-score");
const usernameInput = document.querySelector("#username");
const saveHighScoreBtn = document.querySelector("#save-high-score");
const mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore.innerText = mostRecentScore;

usernameInput.addEventListener("keyup", (e) => {
  saveHighScoreBtn.disabled = !usernameInput.value;
});

const saveHighScore = (e) => {
  console.log('hi');
  e.preventDefault();

};
