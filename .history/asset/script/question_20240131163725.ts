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

let totalScore

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(new URL(currentUrl).search);
    const questionListContainer = document.getElementById("question-list")!;

    const typeParam = urlParams.get("type");
    const headTitle = document.getElementById("title");
    const headImg = document.getElementById("head_img");
    headTitle!.textContent = typeParam;

    let totalScore = 0;
    let currentQuestionIndex = 0;

    if (questionListContainer) {
      const data: ApiResponse1 = await fetchData();
      const filteredData = data.quizzes.filter(
        (item) => item.title === typeParam
      );

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

          const isCorrect = markedOption.textContent?.endsWith(currentQuestion.answer);

          markAnswer(optionsList, markedOption, isCorrect);

          // Update the border style based on correctness
          if (isCorrect) {
            markedOption.style.border = '2px solid green';
          } else {
            markedOption.style.border = '2px solid red';
          }

          // Automatically move to the next question after submitting
          currentQuestionIndex++;
          if (currentQuestionIndex < filteredData[0].questions.length) {
            displayCurrentQuestion();
          } else {
            // Handle end of questions, e.g., show total score
            questionListContainer.innerHTML = `<p>All questions answered. Your total score is ${totalScore} out of ${filteredData[0].questions.length}.</p>`;
          }
        });

        const nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.style.display = "none";
        nextButton.addEventListener("click", () => {
          // Handle moving to the next question or finishing the quiz
        });

        optionsContainer.appendChild(optionsList);
        optionsContainer.appendChild(submitButton);
        optionsContainer.appendChild(nextButton);

        questionListContainer.appendChild(optionsContainer);
        questionListContainer.appendChild(listItem);
      }

      displayCurrentQuestion();
    } else {
      console.error('Container element with id "question-list" not found.');
    }
  } catch (e) {
    console.log(e);
  }
});

function markOption(optionsList: HTMLUListElement, optionElement: HTMLElement) {
  // Check if the option is already marked
  const markedOption = optionsList.querySelector(".marked") as HTMLElement;

  if (markedOption) {
    // Remove the "marked" class from the previously marked option
    markedOption.classList.remove("marked");
    markedOption.style.border = ''; // Clear the previous border style
  }

  // Add the "marked" class to the current option
  optionElement.classList.add('marked');
}

function markAnswer(optionsList: HTMLUListElement, markedOption: HTMLElement, isCorrect: boolean | undefined) {
  // Function to mark the correct answer after submitting
  // You can customize this function based on your requirements
  // For example, you might want to update the total score here
  if (isCorrect) {
    totalScore++;
  }
}

// ...