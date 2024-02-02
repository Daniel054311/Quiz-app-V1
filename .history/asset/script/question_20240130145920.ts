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
    const headTitle = document.getElementById("title");
    const headImg = document.getElementById("head_img");

    // Get the left container and questions container
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
      

      filteredData.forEach((quiz) => {
        totalQuestions = quiz.questions.length;
      });
      console.log(totalQuestions);
      

      // Initialize current page index
      let currentPage = 0;

      // Function to display questions for the current page
      const displayQuestions = () => {
        const quiz = filteredData[currentPage];

        // Display the question in the left container
        const questionElement = document.createElement("h1");
        questionElement.textContent = `Question ${
          totalQuestion + 1
        } of ${quiz.questions.length}: ${quiz.questions[totalQuestion].question}`;
        leftContainer.appendChild(questionElement);

        // Display options in the questions container
        const optionsList = document.createElement("ul");
        optionsList.className = "options-list";

        quiz.questions[currentPage].options.forEach((option) => {
          const optionItem = document.createElement("li");
          optionItem.textContent = option;
          optionsList.appendChild(optionItem);
        });

        questionsContainer.appendChild(optionsList);
      };

      // Initial display of questions
      displayQuestions();

      // Pagination buttons
      const prevButton = document.createElement("button");
      prevButton.textContent = "Previous";
      prevButton.addEventListener("click", () => {
        if (currentPage > 0) {
          currentPage--;
          // Clear existing content in both containers
          leftContainer.innerHTML = "";
          questionsContainer.innerHTML = "";
          // Display questions for the current page
          displayQuestions();
        }
      });

      const nextButton = document.createElement("button");
      nextButton.textContent = "Next";
      nextButton.addEventListener("click", () => {
        if (currentPage < totalQuestions ) {
          currentPage++;
          
          // Clear existing content in both containers
          leftContainer.innerHTML = "";
          questionsContainer.innerHTML = "";
          // Display questions for the current page
          displayQuestions();
        }
      });

      // Append pagination buttons
      document.body.appendChild(prevButton);
      document.body.appendChild(nextButton);
    }
  } catch (e) {
    console.error(e);
  }
});
