const questionBank = [
  {
    id: crypto.randomUUID(),
    question: 'What does DOM stand for?',
    options: [
      {
        option: 'Document Object Model',
        isCorrect: true,
      },
      {
        option: 'Data Object Management',
        isCorrect: false,
      },
      {
        option: 'Document Oriented Model',
        isCorrect: false,
      },
      {
        option: 'Dynamic Object Method',
        isCorrect: false,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    question: 'Which of the following is NOT a JavaScript data type?',
    options: [
      {
        option: 'String',
        isCorrect: false,
      },
      {
        option: 'Boolean',
        isCorrect: false,
      },
      {
        option: 'Float',
        isCorrect: true,
      },
      {
        option: 'Number',
        isCorrect: false,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    question: 'What is the correct way to declare a variable in JavaScript?',
    options: [
      {
        option: 'variable myVar = 5;',
        isCorrect: false,
      },
      {
        option: 'let myVar = 5;',
        isCorrect: true,
      },
      {
        option: 'declare myVar = 5;',
        isCorrect: false,
      },
      {
        option: 'int myVar = 5;',
        isCorrect: false,
      },
    ],
  },
];

// Quiz state
let currentQuestionIndex = Math.trunc(Math.random() * questionBank.length);
let score = 0;
let selectedAnswer = null;

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', function () {
  loadQuestion();
});

// Load the current question
function loadQuestion() {
  const currentQuestion = questionBank[currentQuestionIndex];

  // Update question text
  document.querySelector('#question-text').textContent =
    currentQuestion.question;

  // Update question counter
  document.getElementById('current-question').textContent =
    currentQuestionIndex + 1;
  document.getElementById('total-questions').textContent = questionBank.length;

  // Create options
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';

  currentQuestion.options.forEach((option, index) => {
    const optionElement = document.createElement('label');
    optionElement.className =
      'block p-3 border rounded hover:bg-gray-50 cursor-pointer';
    optionElement.innerHTML = `
            <input type="radio" name="answer" value="${index}" class="mr-3" />
            ${option.option}
        `;
    optionsContainer.appendChild(optionElement);
  });

  // Reset UI state
  selectedAnswer = null;
  document.getElementById('submit-button').disabled = false;
  document.getElementById('next-button').classList.add('hidden');
  document.getElementById('result-message').classList.add('hidden');

  // Add event listeners to radio buttons
  const radioButtons = document.querySelectorAll('input[name="answer"]');
  radioButtons.forEach((radio) => {
    radio.addEventListener('change', function () {
      selectedAnswer = parseInt(this.value);
    });
  });
}

// Submit the answer
function submitAnswer() {
  if (selectedAnswer === null) {
    alert('Please select an answer!');
    return;
  }

  const currentQuestion = questionBank[currentQuestionIndex];
  const isCorrect = currentQuestion.options[selectedAnswer].isCorrect;

  // Update score
  if (isCorrect) {
    score++;
  }

  // Show result
  const resultMessage = document.getElementById('result-message');
  resultMessage.classList.remove('hidden');

  if (isCorrect) {
    resultMessage.className = 'mt-4 p-3 rounded bg-green-100 text-green-800';
    resultMessage.textContent = '✓ Correct! Well done!';
  } else {
    const correctAnswer = currentQuestion.options.find(
      (opt) => opt.isCorrect
    ).option;
    resultMessage.className = 'mt-4 p-3 rounded bg-red-100 text-red-800';
    resultMessage.textContent = `✗ Incorrect. The correct answer is: ${correctAnswer}`;
  }

  // Disable submit button and show next button
  document.getElementById('submit-button').disabled = true;

  if (currentQuestionIndex < questionBank.length - 1) {
    document.getElementById('next-button').classList.remove('hidden');
  } else {
    // Quiz finished
    showFinalResults();
  }
}

// Move to next question
function nextQuestion() {
  currentQuestionIndex++;
  loadQuestion();
}

// Show final results
function showFinalResults() {
  const percentage = Math.round((score / questionBank.length) * 100);

  setTimeout(() => {
    alert(
      `Quiz Complete!\n\nYour Score: ${score}/${
        questionBank.length
      } (${percentage}%)\n\n${getScoreMessage(percentage)}`
    );

    // Ask if they want to restart
    if (confirm('Would you like to take the quiz again?')) {
      restartQuiz();
    }
  }, 2000);
}

// Get score message based on percentage
function getScoreMessage(percentage) {
  if (percentage === 100) return 'Perfect! You are a web development expert!';
  if (percentage >= 80) return 'Excellent work! You know your stuff!';
  if (percentage >= 60) return 'Good job! Keep learning!';
  return 'Keep practicing - you will get there!';
}

// Restart the quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer = null;
  loadQuestion();
}

// Randomly select a question from the question bank (for testing)
console.log(questionBank[Math.trunc(Math.random() * questionBank.length)]);