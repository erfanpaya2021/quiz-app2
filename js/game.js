// DOM VARIABLES
const question = document.querySelector(".question");
const choices = document.querySelectorAll(".choice-text");
const progressText = document.querySelector("#progress-text");
const progressBar = document.querySelector(".progress-inner-div");
const scoreText = document.querySelector("#score");
const game = document.querySelector(".game");
const loader = document.querySelector(".loader");

// VARIABLES
let currentQuestion = {};
let accesptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

const getDataFromUrl = async () => {
  const respone = await fetch(
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple",
  );
  const data = await respone.json();
  const loadedQuestions = data.results;
  questions = loadedQuestions.map((loadedQuestion) => {
    // CREATE FORMATTED QUESTION AND ADD QUESTION TO OBJ
    const formattedQuestion = {
      question: loadedQuestion.question,
    };

    // ADD CHOICES TO OBJ
    const answers = [...loadedQuestion.incorrect_answers];
    const answer = Math.floor(Math.random() * 3);
    answers.splice(answer, 0, loadedQuestion.correct_answer);
    answers.forEach((choice, index) => {
      formattedQuestion["choice" + (index + 1)] = choice;
    });

    // ADD ANSWER TO OBJ
    formattedQuestion["answer"] = answer + 1;

    // RETURN OBJ
    return formattedQuestion;
  });

  game.classList.remove("hidden");
  loader.classList.add("hidden");
  startGame();
};

getDataFromUrl();

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

const getNewQuestion = () => {
  // GO TO END PAGE
  if (availableQuestions.length === 0 || questionCounter === MAX_QUESTIONS) {
    // SET MOST RECENT SCORE
    localStorage.setItem("mostRecentScore", score);
    window.location.assign("/quiz-app2/end.html");
  }

  // DISPLAY QUESTION COUNTER AND PROGRESS BAR
  questionCounter++;
  progressText.innerText = `Question: ${questionCounter}/${MAX_QUESTIONS}`;
  progressBar.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  // GET RANDOM QUESTION FROM AVAILABLES QUESTION LIST
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];

  // DISPLAY QUESTION
  question.innerText = currentQuestion["question"];

  // DISPLAY CHOICES
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  // REMOVE CURRENT QUESTION FROM AVAILABE QUESTION LIST
  availableQuestions.splice(questionIndex, 1);
  accesptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!accesptingAnswers) return;

    accesptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion["answer"] ? "correct" : "incorrect";

    // DISPLAY SCORE
    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
