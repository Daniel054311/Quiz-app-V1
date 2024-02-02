// Define interfaces
interface ApiResponse1 {
  quizzes: quizzes[];
}

interface quizzes {
  title: string;
  icon: string;
  questions: { question: string; options: string[] }[];
  answer: string;
  backgroundColor: string;
}

let currentPage = 0;
let totalQuestions = 0;

// Fetch data function
async function fetchData(): Promise<ApiResponse1> {
  try {
    const response = await fetch("./data.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: ApiResponse1 = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

// DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Get elements by ID
    const leftContainer = document.querySelector(".left-container");
    const questionsContainer = document.getElementById("question-page");

    // Check if left and questions containers exist
    if (leftContainer && questionsContainer) {
      // Clear existing content in both containers
      leftContainer.innerHTML = "";
      questionsContainer.innerHTML = "";

      // Fetch data from the API
      const data: ApiResponse1 = await fetchData();

      // Filter the data based on the 'type' parameter
      const filteredData = data.quizzes;

      // Initialize current page index
      let currentPage = 0;

      // Function to display questions for the current page
      const displayQuestions = () => {
        const quiz = filteredData[currentPage];

        // Display the question in the left container
        const questionElement = document.createElement("h1");
        questionElement.textContent = `Question ${currentPage + 1} of ${
          quiz.questions.length
        }: ${quiz.questions[currentPage].question}`;
        leftContainer.appendChild(questionElement);

        // Display options in the questions container
        const optionsList = document.createElement("ul");
        optionsList.className = "options-list";

        quiz.questions[currentPage].options.forEach((option) => {
          const optionItem = document.createElement("li");
          optionItem.textContent = option;
          optionsList.appendChild(optionItem);
        });

        // Append the options list to the questions container
        questionsContainer.appendChild(optionsList);
      };

      // Initial display of questions
      displayQuestions();
    }
  } catch (e) {
    console.error(e);
  }
});
