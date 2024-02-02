// Define interfaces
interface ApiResponse1 {
    quizzes: quizzes[];
  }
  
  interface quizzes {
    id: number|string;
    title: string;
    icon: string;
    questions: string[];
    options: string[];
    answer: string;
    backgroundColor: string;
  }
  
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
      // Get the current URL
      const currentUrl = window.location.href;
  
      // Parse the URL to get the search parameters
      const urlParams = new URLSearchParams(new URL(currentUrl).search);
  
      // Get the value of the 'type' parameter
      const typeParam = urlParams.get("type");
  
      // Get elements by ID
      const headTitle = document.getElementById("title");
      const headImg = document.getElementById("head_img");
  
      // Check if headTitle exists before updating its textContent
      if (headTitle) {
        headTitle.textContent = typeParam;
      }
  
      // Fetch data from the API
      const data: ApiResponse1 = await fetchData();
  
      // Filter the data based on the 'type' parameter
      const filteredData = data.quizzes.filter((item) => item.title === typeParam);
  
      // Get the container where you want to display the options
      const optionsContainer = document.getElementById("question-page");
  
      // Check if the container exists
      if (optionsContainer) {
        // Clear existing content
        optionsContainer.innerHTML = "";
  
        filteredData.forEach((quiz) => {
            quiz.questions.forEach((questionData, index) => {
              const listItem = document.createElement("li");
              listItem.className = "option-item";
          
              const questionElement = document.createElement("div");
              questionElement.className = "question";
              questionElement.textContent = `Question ${index + 1} of ${quiz.questions.length}: ${questionData.question}`;
          
              const optionsElement = document.createElement("div");
              optionsElement.className = "options";
          
              questionData.options.forEach((option, optionIndex) => {
                const optionItem = document.createElement("div");
                optionItem.className = "option";
                optionItem.textContent = `${String.fromCharCode(65 + optionIndex)}. ${option}`;
                optionsElement.appendChild(optionItem);
              });
          
              // Append elements to the list item
              listItem.appendChild(questionElement);
              listItem.appendChild(optionsElement);
          
              // Append the list item to the options container
              optionsContainer.appendChild(listItem);
            });
          });
          
        console.log(filteredData);
          
      }
    } catch (e) {
      console.error(e);
    }
  });
  