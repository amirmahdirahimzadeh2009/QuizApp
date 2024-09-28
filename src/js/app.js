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

  welcomePage.Style.opacity = 0;

  e.preventDefault();
});
