import { quizData } from "./quizData.js";

const welcomePage = document.querySelector(".welcomePage");
const quizForm = document.querySelector(".quizForm");
const questionBox = document.querySelector(".questionBox");
const answerA = document.querySelector(".A");
const answerB = document.querySelector(".B");
const answerC = document.querySelector(".C");
const answerD = document.querySelector(".D");
const nextBtn = document.querySelector(".nextButton");
const counter = document.querySelector(".counter");
const timer = document.querySelector(".timer");
const quizScreen = document.querySelector(".quizScreen");
const scoreSection = document.querySelector(".score-section");
const scoreBox = document.querySelector(".score");

let userName = "";
let currentQuestion = 0;
let score = 0;
let time = 25;
let timerInterval;

quizForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!e.target.userName.value) {
    alert("Please Enter Your Name");
    return;
  }
  userName = e.target.userName.value;
  welcomePage.remove();
  loadQuestion();
});

function loadQuestion() {
  const currentQuizData = quizData[currentQuestion];
  questionBox.innerText = currentQuizData.question;

  answerA.innerHTML = `${currentQuizData.a} ${circleIcon}`;
  answerB.innerHTML = `${currentQuizData.b} ${circleIcon}`;
  answerC.innerHTML = `${currentQuizData.c} ${circleIcon}`;
  answerD.innerHTML = `${currentQuizData.d} ${circleIcon}`;

  nextBtn.disabled = true;
  nextBtn.classList.add("opacity-50");
  counter.innerHTML = `${currentQuestion + 1} / ${quizData.length}`;
  time = 25;
  Timer();
}

function Timer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer.innerText = time;
    if (time <= 5) {
      timer.classList.add("text-red-500", "border-red-500");
    } else {
      timer.classList.remove("text-red-500", "border-red-500");
    }
    if (time === 0) {
      clearInterval(timerInterval);
      nextQuestion();
    }
    time--;
  }, 1000);
}

const circleIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="10" cy="10" r="9.5" stroke="black"/>
</svg>`;

const answers = document.querySelectorAll(".option");
answers.forEach((btn) => {
  btn.addEventListener("click", selectAnswer);
});

function selectAnswer(e) {
  const selectedAnswer = e.target.classList[0];
  const currentQuizData = quizData[currentQuestion];

  answers.forEach((btn) => {
    btn.classList.remove("bg-[#ABD1C6]");
    btn.querySelector("svg").innerHTML = circleIcon;
  });

  e.target.classList.add("bg-[#ABD1C6]");
  e.target.querySelector(
    "svg"
  ).outerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="10" cy="10" r="10" fill="#004643"/>
  <path d="M8 11.6L13.9 5.7C14.0833 5.51667 14.3167 5.425 14.6 5.425C14.8833 5.425 15.1167 5.51667 15.3 5.7C15.4833 5.88334 15.575 6.11667 15.575 6.4C15.575 6.68334 15.4833 6.91667 15.3 7.1L8.7 13.7C8.5 13.9 8.26667 14 8 14C7.73334 14 7.5 13.9 7.3 13.7L4.7 11.1C4.51667 10.9167 4.425 10.6833 4.425 10.4C4.425 10.1167 4.51667 9.88334 4.7 9.7C4.88334 9.51667 5.11667 9.425 5.4 9.425C5.68334 9.425 5.91667 9.51667 6.1 9.7L8 11.6Z" fill="white"/>
  </svg>`;

  if (selectedAnswer === currentQuizData.correct) {
    score++;
  }

  nextBtn.disabled = false;
  nextBtn.classList.remove("opacity-50");
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  }
}

// function nextQuiz() {
//   quizScreen.style.opacity = 0;
//   setTimeout(() => {
//     quizScreen.style.display = "none";
//     scoreSection.style.display = "block";
//     scoreSection.style.opacity = 1;
//     scoreBox.innerHTML = `${score} / ${quizData.length}`;
//   }, 500);
// }

nextBtn.addEventListener("click", nextQuestion);
