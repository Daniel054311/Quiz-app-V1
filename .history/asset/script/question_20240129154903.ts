// question.ts

// Define an interface for the expected data structure
export interface Option {
  optionLetter: string;
  ratio: string;
  backgroundColor: string;
}

export interface Question {
  questionNumber: string;
  questionText: string;
  options: Option[];
}

// Function to display the question
export function displayQuestion(question: Question): void {
  const questionNumberElement = document.querySelector(
    ".question"
  ) as HTMLElement;
  const questionTextElement = document.querySelector("h1") as HTMLElement;
  const optionsContainer = document.querySelector(
    ".navigation ul"
  ) as HTMLUListElement;

  // Display question number
  questionNumberElement.textContent = `Question ${question.questionNumber} of 10`;

  // Display question text
  questionTextElement.innerHTML = question.questionText;

  // Display options
  optionsContainer.innerHTML = question.options
    .map(
      (option) => `
      <li class="option-item">
        <h1 class="options">${option.optionLetter}</h1>
        <div class="content" style="background-color:${option.backgroundColor}">${option.ratio}</div>
      </li>
    `
    )
    .join("");
}
