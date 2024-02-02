interface ApiResponse1 {
    quizzes: quizzes[],
   
}

interface quizzes {

    title: string;
    icon: string;
    questions: {
      question: string;
      options: string[];
      answer: string;
    }[];
  
  backgroundColor: string;
}
 


async function fetchData(): Promise<ApiResponse1> {
  try {
    const response = await fetch("./data.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: ApiResponse1 = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data1:", error.message);
    throw error;
  }
}

fetchData();

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Get the current URL
    const currentUrl = window.location.href;
    // Parse the URL to get the search parameters
    const urlParams = new URLSearchParams(new URL(currentUrl).search);
    // Get the value of the 'type' parameter
    const typeParam = urlParams.get("type");
    const headTitle = document.getElementById("title");
    const headImg = document.getElementById("head_img");
    headTitle!.textContent = typeParam;
    // Fetch data from the API
    const data: ApiResponse1 = await fetchData();

    // Filter the data based on the 'type' parameter
    // Filter the data based on the 'type' parameter
    const filteredData = data.quizzes.filter(
      (item) => item.title === typeParam

    );
// Assuming you have a container element with id "question-list"
const questionListContainer = document.getElementById('question-list')!;

// Define variables to store the total score and total questions
let totalScore = 0;
let totalQuestions = 0;

// Check if the container element exists
if (questionListContainer) {
    const questions = getFlattenedQuestions(filteredData);
    totalQuestions = questions.length; // Assign the total number of questions

    let currentQuestionIndex = 0;

    function displayCurrentQuestion() {
        // ... (unchanged code)
    }

    // Initial display
    displayCurrentQuestion();
} else {
    console.error('Container element with id "question-list" not found.');
}

// Function to flatten nested questions array
function getFlattenedQuestions(data) {
    return data.reduce((acc, curr) => acc.concat(curr.questions), []);
}

// Function to mark an option with a border color
function markOption(optionElement: HTMLElement, isCorrect: boolean) {
    if (isCorrect) {
        optionElement.style.border = '2px solid green';
        // Increase the total score for correct answers
        totalScore++;
    } else {
        optionElement.style.border = '2px solid red';
    }
    optionElement.classList.add('marked');
    // Optionally, you can show feedback based on correctness here
}

// Function to mark the correct answer after submitting
function markAnswer(optionsList: HTMLUListElement, correctAnswer: string) {
    Array.from(optionsList.children).forEach((optionElement) => {
        if (optionElement instanceof HTMLElement) {
            const optionText = optionElement.textContent || '';
            const option = optionText.split(':')[1].trim();
            if (option === correctAnswer) {
                markOption(optionElement, true);
            }
        }
    });
}

// Function to show the "Next" button
function showNextButton() {
    const nextButton = document.querySelector('.right-container button:last-child') as HTMLElement | null;
    if (nextButton) {
        nextButton.style.display = 'inline-block';
    }
}

// Function to show the total score on the next page
function showTotalScore() {
    // Assuming you have a container element with id "total-score"
    const totalScoreContainer = document.getElementById('total-score');
    if (totalScoreContainer) {
        totalScoreContainer.textContent = `Your total score is ${totalScore} out of ${totalQuestions}.`;
    } else {
        console.error('Container element with id "total-score" not found.');
    }
}

 
  } catch (e) {
    console.log(e);
  }
});
