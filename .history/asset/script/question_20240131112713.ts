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
  
          const currentQuestion = filteredData[0].questions[0];
  
          const listItem = document.createElement("div");
          listItem.classList.add("list-item");
  
          const leftContainer = document.createElement("div");
          leftContainer.classList.add("left-container");
  
          const questionNumber = document.createElement("p");
          questionNumber.classList.add("question");
          questionNumber.textContent = `Question 1 of 1`;
  
          const questionText = document.createElement("h1");
          questionText.innerHTML = currentQuestion.question;
  
          leftContainer.appendChild(questionNumber);
          leftContainer.appendChild(questionText);
  
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
  
         
  
          questionListContainer.appendChild(listItem);
          questionListContainer.appendChild(optionsContainer);
        }
  
        displayCurrentQuestion();
  
      } else {
        console.error('Container element with id "question-list" not found.');
      }
  
    } catch (e) {
      console.log(e);
    }
  });
  
  function markOption(optionElement: HTMLElement, isCorrect: boolean) {
    // Function to mark an option with a border color
  }
  
  function markAnswer(optionsList: HTMLUListElement, correctAnswer: string) {
    // Function to mark the correct answer after submitting
  }
  
  function showNextButton() {
    // Function to show the "Next" button
  }
  