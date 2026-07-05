// DOM elements//
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-button");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the national drink of pakistan?",
    answers: [
      { text: "Mango Juice", correct: false },
      { text: "Sugarcane", correct: true },
      { text: "Lassi", correct: false },
      { text: "Lemon Drink", correct: false },
    ],
  },
  {
    question: "Which province is the breadbasket of Pakistan?",
    answers: [
      { text: "Khyber Pakhtunkhawa", correct: false },
      { text: "Sindh", correct: false },
      { text: "Punjab", correct: true },
      { text: "Balochistan", correct: false },
    ],
  },
  {
    question:
      "The National Bank of Pakistan runs the world's highest ATM at an incredible elevation of 4,693 meters, Where it is located?",
    answers: [
      { text: "Attock", correct: false },
      { text: "Khanewal", correct: false },
      { text: "Khunjerab Pass", correct: true },
      { text: "Mardan", correct: false },
    ],
  },
  {
    question:
      "The world's first computer virus for MS-DOS, called Brain, was coded in Lahore in 1986 by two Pakistani brothers, What were there names?",
    answers: [
      { text: "Amit and Basit Farooq Alvi", correct: true },
      { text: "Ali Ahmed and Mustafa", correct: false },
      { text: "Nasir and Yasir", correct: false },
      { text: "Faraz and Shaheen", correct: false },
    ],
  },
  {
    question:
      "Who is the most famous and loved politician in the whole history of Pakistan?",
    answers: [
      { text: "Sheikh Rasheed", correct: false },
      { text: "Zulfiqar Ali Bhutto", correct: false },
      { text: "Benazir Bhutto", correct: false },
      { text: "Imran Khan", correct: true },
    ],
  },
];
// quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}
function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  // todo: explain this in a second
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}
function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;
  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }
  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}
function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
