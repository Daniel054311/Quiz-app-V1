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
  
        // Initialize current page index
        let currentPage = 0;
  
        // Initialize total questions
        let totalQuestions = 0;
  
        // Display total questions for each subject
        filteredData.forEach((quiz) => {
          totalQuestions += quiz.questions.length;
        });
        console.log(totalQuestions);
  
        
  
        const nextButton = document.createElement("button");
        
        nextButton.textContent = "Next";
        nextButton.addEventListener("click", () => {
          if (currentPage < totalQuestions - 1) {
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
  