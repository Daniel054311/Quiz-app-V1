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

