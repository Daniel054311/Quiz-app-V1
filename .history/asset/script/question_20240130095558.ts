// Define interfaces
interface ApiResponse1 {
    quizzes: quizzes[];
  }
  
  interface quizzes {
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
  
        // Iterate over the questions and append them to the container
        filteredData.forEach((quiz) => {
          quiz.questions.forEach((question, index) => {
            const listItem = document.createElement("li");
            listItem.className = "option-item";
  
            const content = document.createElement("div");
            content.className = "content";
            content.textContent = question;
  
            // Add event listener for each option
            listItem.addEventListener('click', function () {
              // Check if the clicked option is correct or wrong (you need to implement this logic)
              const isCorrect = quiz.answer === quiz.options[index];
  
              // Add 'correct' or 'wrong' class to the clicked option
              content.classList.add(isCorrect ? 'correct' : 'wrong');
  
              // Add icon based on correctness
              const icon = document.createElement("img");
              icon.src = isCorrect ? "/" : "path-to-wrong-icon";
              icon.alt = isCorrect ? "Correct Icon" : "Wrong Icon";
              icon.className = "answer-icon";
  
              // Append the icon to the list item
              listItem.appendChild(icon);
            });
  
            // Append elements to the list item
            listItem.appendChild(content);
  
            // Append the list item to the options container
            optionsContainer.appendChild(listItem);
          });
        });
      }
    } catch (e) {
      console.error(e);
    }
  });
  