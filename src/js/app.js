import { quizData } from "./quizData.js";

const welcomePage = document.querySelector(".welcomePage");
const quizForm = document.querySelector(".quizForm");
let userName;

quizForm.addEventListener("submit", (e) => {
  setTimeout(() => {
    welcomePage.remove();
  }, 500);

  if (!e.target.userName.value) {
    alert("Please Enter Your Name");
    return;
  }
  userName = e.target.userName.value;

  welcomePage.style.opacity = 0;

  e.preventDefault();
});

let currentQuestion = 0;

const questionBox = document.querySelector(".questionBox");

const answerA = document.querySelector("#A");
const answerB = document.querySelector("#B");
const answerC = document.querySelector("#C");
const answerD = document.querySelector("#D");

const nextBtn = document.querySelector(".nextButton");

function loadQuestion() {
  const currentQuizData = quizData[currentQuestion];
  questionBox.innerText = currentQuizData.question;

  answerA.innerHTML = `${currentQuizData.a} ${circleIcon}`;
  answerB.innerHTML = `${currentQuizData.b} ${circleIcon}`;
  answerC.innerHTML = `${currentQuizData.c} ${circleIcon}`;
  answerD.innerHTML = `${currentQuizData.d} ${circleIcon}`;

  nextBtn.disabled = true;
  nextBtn.disabled
    ? nextBtn.classList.add("opacity-50")
    : nextBtn.classList.add("bg-[#004643c4]");
}

const circleIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="10" cy="10" r="9.5" stroke="black"/>
</svg>
`;
loadQuestion();

const answers = document.querySelector(".option");

answers.forEach((btn) => {
  btn.addEventListener("click", selectAnswer);
});

function selectAnswer(e) {
  const selectedAnswer = e.target.id;
  const currentQuizData = quizData[currentQuestion];

  answers.forEach(btn.classList.add("bg-white"));

  e.target.classList.remove("bg-white");
  e.target.classList.add("#ABD1C6");

  document
    .getElementById("selectedAnswer")
    .querySelector("svg").innerHTML = `<svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="10" r="10" fill="#004643" />
    <path
      d="M8 11.6L13.9 5.7C14.0833 5.51667 14.3167 5.425 14.6 5.425C14.8833 5.425 15.1167 5.51667 15.3 5.7C15.4833 5.88334 15.575 6.11667 15.575 6.4C15.575 6.68334 15.4833 6.91667 15.3 7.1L8.7 13.7C8.5 13.9 8.26667 14 8 14C7.73334 14 7.5 13.9 7.3 13.7L4.7 11.1C4.51667 10.9167 4.425 10.6833 4.425 10.4C4.425 10.1167 4.51667 9.88334 4.7 9.7C4.88334 9.51667 5.11667 9.425 5.4 9.425C5.68334 9.425 5.91667 9.51667 6.1 9.7L8 11.6Z"
      fill="white"
    />
  </svg>;`;
}
