const highScoresList = document.querySelector(".high-scores-list");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  .map((score) => {
    return `<li class="high-scores-list-item">
    <span id="username">${score.username}</span> <span id="score">${score.score}</span></li>`;
  })
  .join("");
