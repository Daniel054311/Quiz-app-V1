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
    const questionListContainer = document.getElementById("question-list")!;

    const typeParam = urlParams.get("type");
    const headTitle = document.getElementById("title");
    const header = document.getElementById("header");
    headTitle!.textContent = typeParam;
    let totalScore = 0;
    let currentQuestionIndex = 0;

    if (questionListContainer) {
      const data: ApiResponse1 = await fetchData();
      const filteredData = data.quizzes.filter(
        (item) => item.title === typeParam
      );

      if (filteredData.length > 0) {
        const imageUrl = filteredData[0].icon;
        const headImg = document.getElementById("head_img") as HTMLImageElement;

        if (headImg && imageUrl) {
          headImg.src = imageUrl;
        } else {
          console.error('Image element with id "head_img" not found or imageUrl not available.');
        }

        function displayCurrentQuestion() {
          questionListContainer.innerHTML = "";

          const currentQuestion = filteredData[0].questions[currentQuestionIndex];

          const listItem = document.createElement("div");
          listItem.classList.add("list-item");

          const leftContainer = document.createElement("div");
          leftContainer.classList.add("left-container");

          const questionNumber = document.createElement("p");
          questionNumber.classList.add("question");
          questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${filteredData[0].questions.length}`;

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
            listItem.textContent = `${String.fromCharCode(
              65 + index
            )}: ${option}`;

            listItem.addEventListener("click", () => {
              if (!listItem.classList.contains("marked")) {
                markOption(optionsList, listItem);
              }
            });

            optionsList.appendChild(listItem);
          });

          const submitButton = document.createElement("button");
          submitButton.className = "submit";
          submitButton.textContent = "Submit";
          submitButton.addEventListener("click", () => {
            const markedOption = optionsList.querySelector(
              ".marked"
            ) as HTMLElement;

            if (!markedOption) {
              alert("Please select an option before submitting.");
              return;
            }

            markAnswer(optionsList, currentQuestion.answer);

            // Show the "Next" button
            nextButton.style.display = "block";

            // Disable further clicks on options
            optionsList.querySelectorAll("li").forEach((option) => {
              option.removeEventListener("click", optionClickHandler);
            });
          });

          const nextButton = document.createElement("button");
          nextButton.textContent = "Next";
          nextButton.style.display = "none";
          nextButton.addEventListener("click", () => {
            // Handle moving to the next question or finishing the quiz

            // Reset styles for the next question
            optionsList.querySelectorAll("li").forEach((option) => {
              option.style.border = "";
              option.classList.remove("marked", "correct");
            });

            nextButton.style.display = "none";

            // Enable click event for options
            optionsList.querySelectorAll("li").forEach((option) => {
              option.addEventListener("click", optionClickHandler);
            });

            // Display the next question
            currentQuestionIndex++;
            if (currentQuestionIndex < filteredData[0].questions.length) {
              displayCurrentQuestion();
              
            } else {
              // Handle end of questions, e.g., show total score
              questionListContainer.innerHTML = `<p>All questions answered. Your total score is ${totalScore} out of ${filteredData[0].questions.length}.</p>`;
            }
          });

          optionsContainer.appendChild(optionsList);
          optionsContainer.appendChild(submitButton);
          optionsContainer.appendChild(nextButton);

          questionListContainer.appendChild(optionsContainer);
          questionListContainer.appendChild(listItem);
        }

        // Event handler for option clicks
        function optionClickHandler() {
          if (!this.classList.contains("marked")) {
            markOption(optionsList, this); // Add this declaration for optionsList
            const optionsList = document.createElement("ul");
            optionsList.classList.add("options-list");
          }
        }

        // Attach click event to options
        optionsList.querySelectorAll("li").forEach((option) => {
          option.addEventListener("click", optionClickHandler);
        });

        displayCurrentQuestion();
      } else {
        console.error('No quiz found with the specified type.');
      }
    } else {
      console.error('Container element with id "question-list" not found.');
    }
  } catch (e) {
    console.log(e);
  }
});

function markOption(optionsList: HTMLUListElement, optionElement: HTMLElement) {
  // Only change the border color to purple when an option is clicked
  optionElement.style.border = '2px solid purple';

  // Add the "marked" class to the current option
  optionElement.classList.add('marked');
}

function markAnswer(optionsList: HTMLUListElement, correctAnswer: string) {
  // Function to mark the correct answer after submitting
  optionsList.querySelectorAll('li').forEach((option) => {
    if (option.textContent?.endsWith(correctAnswer)) {
      option.classList.add('correct');
    }
  });
}

function showNextButton() {
  // Function to show the "Next" button
}
