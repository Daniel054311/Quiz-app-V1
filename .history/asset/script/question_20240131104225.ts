// ...

interface ApiResponse1 {
    quizzes: quizzes[];
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
  
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const currentUrl = window.location.href;
      const urlParams = new URLSearchParams(new URL(currentUrl).search);
      const typeParam = urlParams.get("type");
      const headTitle = document.getElementById("title");
      const headImg = document.getElementById("head_img");
      headTitle!.textContent = typeParam;
  
      const questionListContainer = document.getElementById("question-list")!;
      let totalScore = 0;
  
      if (questionListContainer) {
        const data: ApiResponse1 = await fetchData();
        const filteredData = data.quizzes.filter((item) => item.title === typeParam);
  
        function displayCurrentQuestion() {
          questionListContainer.innerHTML = "";
  
          const currentQuestion = questions[currentQuestionIndex];
  
          const listItem = document.createElement("div");
          listItem.classList.add("list-item");
  
          const leftContainer = document.createElement("div");
          leftContainer.classList.add("left-container");
  
          // ... (existing code for leftContainer)
  
          listItem.appendChild(leftContainer);
  
          const optionsContainer = document.createElement("div");
          optionsContainer.classList.add("options-container");
  
          const optionsList = document.createElement("ul");
          optionsList.classList.add("options-list");
          currentQuestion.options.forEach((option, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${String.fromCharCode(65 + index)}: ${option}`;
  
            listItem.addEventListener("click", () => {
              if (!listItem.classList.contains("marked")) {
                markOption(listItem, option === currentQuestion.answer);
              }
            });
  
            optionsList.appendChild(listItem);
          });
  
          optionsContainer.appendChild(optionsList);
  
          // ... (existing code for submitButton and nextButton)
  
          optionsContainer.appendChild(submitButton);
          optionsContainer.appendChild(nextButton);
  
          questionListContainer.appendChild(optionsContainer);
          questionListContainer.appendChild(listItem);
        }
  
        // ... (existing code)
  
      } else {
        console.error('Container element with id "question-list" not found.');
      }
  
      // ... (rest of the code)
  
    } catch (e) {
      console.log(e);
    }
  });
  
  // ...
  