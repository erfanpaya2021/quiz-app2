const finalScore = document.querySelector("#final-score");
const usernameInput = document.querySelector("#username");
const saveHighScoreBtn = document.querySelector("#save-high-score");
const mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore.innerText = mostRecentScore;

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;

usernameInput.addEventListener("keyup", (e) => {
  saveHighScoreBtn.disabled = !usernameInput.value;
});

const saveHighScore = (e) => {
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    username: usernameInput.value,
  };

  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/");
};
