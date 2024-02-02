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
  
         
  
        
  
        // Append pagination buttons
        document.body.appendChild(prevButton);
        document.body.appendChild(nextButton);
      }
    } catch (e) {
      console.error(e);
    }
  });
  