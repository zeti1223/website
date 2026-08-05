const quizData = [
  {
    question: "Which two companies did Steve Jobs help found?",
    a: "Apple, IBM",
    b: "Apple, Pixar",
    c: "Apple, Disney",
    d: "IBM, Pixar",
    correct: "b",
  },
  {
    question: "What is the capital of Australia?",
    a: "Sydney",
    b: "Melbourne",
    c: "Canberra",
    d: "Brisbane",
    correct: "c",
  },
  {
    question: "What does the 'H' in HTML stand for?",
    a: "Hyper",
    b: "High",
    c: "Home",
    d: "Hybrid",
    correct: "a",
  },
  {
    question: "Which planet is known as the Red Planet?",
    a: "Venus",
    b: "Mars",
    c: "Jupiter",
    d: "Saturn",
    correct: "b",
  },
  {
    question: "What is the largest ocean on Earth?",
    a: "Atlantic Ocean",
    b: "Indian Ocean",
    c: "Arctic Ocean",
    d: "Pacific Ocean",
    correct: "d",
  },
  {
    question: "Who painted the Mona Lisa?",
    a: "Vincent van Gogh",
    b: "Pablo Picasso",
    c: "Leonardo da Vinci",
    d: "Michelangelo",
    correct: "c",
  },
  {
    question: "What is the chemical symbol for gold?",
    a: "Go",
    b: "Gd",
    c: "Au",
    d: "Ag",
    correct: "c",
  },
  {
    question: "In which year did World War II end?",
    a: "1943",
    b: "1944",
    c: "1945",
    d: "1946",
    correct: "c",
  },
  {
    question: "What is the fastest land animal?",
    a: "Lion",
    b: "Cheetah",
    c: "Gazelle",
    d: "Horse",
    correct: "b",
  },
  {
    question: "How many bones are in the adult human body?",
    a: "186",
    b: "206",
    c: "226",
    d: "246",
    correct: "b",
  },
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
  let answer;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly!</h2>
                <button onclick="location.reload()">Restart</button>
            `;
    }
  }
});
