// index.ts

// Import the necessary entities from question.ts
import { displayQuestion, Question, Option } from "../script/questioncd ";

document.addEventListener("DOMContentLoaded", () => {
  // Sample question data (replace this with your actual data fetching logic)
  const sampleQuestion: Question = {
    questionNumber: "6",
    questionText:
      "Which of these color contrast ratios defines the minimum WCAG 2.1 Level AA requirement for normal text?",
    options: [
      { optionLetter: "A", ratio: "4.5 :1", backgroundColor: "lightgrey" },
      { optionLetter: "B", ratio: "3.1", backgroundColor: "lightgrey" },
      { optionLetter: "C", ratio: "2.5:1", backgroundColor: "lightgrey" },
      { optionLetter: "D", ratio: "5:1", backgroundColor: "lightgrey" },
    ],
  };

  // Display the sample question on page load (replace this with actual data fetching)
  displayQuestion(sampleQuestion);
});
