

interface quizzes {
  quizzes: quizzes[];
  title: string;
  icon: string;
  questions: {
    question: string;
    options: string[];
    answer: string;
  }[];

  backgroundColor: string;
}

async function fetchData(): Promise<quizzes> {
  try {
    const response = await fetch("./data.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: quizzes = await response.json();
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
    const headImg = document.getElementById("head_img");
    headTitle!.textContent = typeParam;
    let totalScore = 0;
    let currentQuestionIndex = 0;

    if (questionListContainer) {
      const data: quizzes = await fetchData();
      const filteredData = data.quizzes.filter(
        (item) => item.title === typeParam
      );

      console.log(filteredData);
      headImg.src=filteredData.ic
      

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
              markOption(optionsList, listItem, option === currentQuestion.answer);
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

          if (markedOption.classList.contains("correct")) {
            markedOption.style.border = "2px solid green";
          } else {
            markedOption.style.border = "2px solid red";
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

        optionsList.appendChild(submitButton);

        const nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.style.display = "none";
        nextButton.addEventListener("click", () => {
          // Handle moving to the next question or finishing the quiz
        });

        optionsContainer.appendChild(optionsList);
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

function markOption(optionsList: HTMLUListElement, optionElement: HTMLElement, isCorrect: boolean) {
  // Check if the option is already marked
  const markedOption = optionsList.querySelector(".marked") as HTMLElement;

  if (markedOption) {
    // Remove the "marked" class from the previously marked option
    markedOption.classList.remove("marked");
  }

  if (isCorrect) {
    optionElement.style.border = '2px solid green';
  } else {
    optionElement.style.border = '2px solid red';
  }

  // Add the "marked" class to the current option
  optionElement.classList.add('marked');
}

function markAnswer(optionsList: HTMLUListElement, correctAnswer: string) {
  // Function to mark the correct answer after submitting
}

function showNextButton() {
  // Function to show the "Next" button
}
