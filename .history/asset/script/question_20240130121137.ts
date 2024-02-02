// Define interfaces
interface ApiResponse1 {
    quizzes: quizzes[];
  }
  
  interface quizzes {
    id: number|string;
    title: string;
    icon: string;
    questions: { question: string; options?: string[] }[];
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
            quiz.questions.forEach((questionObj, index) => {
              const listItem = document.createElement("li");
              listItem.className = "option-item";
          
               // Get the left container
    const leftContainer = document.querySelector(".left-container");

    // Check if the left container exists
    if (leftContainer) {
      // Clear existing content
      leftContainer.innerHTML = "";

      // Display the question in the left container
      const questionElement = document.createElement("h1");
      questionElement.textContent = `Which of these color contrast ratios defines the minimum WCAG 2.1 Level AA requirement for normal text?`;

      // Append the question element to the left container
      leftContainer.appendChild(questionElement);
    }
              const questionElement = document.createElement("div");
              questionElement.className = "question";
              questionElement.textContent = `Question ${index + 1} of ${quiz.questions.length}: ${questionObj.question}`;
          
              const optionsList = document.createElement("ul");
              optionsList.className = "options-list";
          
              // Display options if they exist
              if (questionObj.options && questionObj.options.length > 0) {
                questionObj.options.forEach((option) => {
                  const optionItem = document.createElement("li");
                  optionItem.textContent = option;
                  optionsList.appendChild(optionItem);
                });
              }
          
              // Append elements to the list item
              listItem.appendChild(questionElement);
              listItem.appendChild(optionsList);
          
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
  