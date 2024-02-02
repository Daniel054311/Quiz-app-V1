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

fetchData();

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Get the current URL
    const currentUrl = window.location.href;
    // Parse the URL to get the search parameters
    const urlParams = new URLSearchParams(new URL(currentUrl).search);
    // Get the value of the 'type' parameter
    const typeParam = urlParams.get("type");
    const headTitle = document.getElementById("title");
    const headImg = document.getElementById("head_img");
    headTitle!.textContent = typeParam;
    // Fetch data from the API
    const data: ApiResponse1 = await fetchData();

    // Filter the data based on the 'type' parameter
    // Filter the data based on the 'type' parameter
    const filteredData = data.quizzes.filter(
      (item) => item.title === typeParam
    );

    // Assuming you have a container element with id "question-list"
    const questionListContainer = document.getElementById("question-list")!;
    questionListContainer

    // Declare totalScore variable
    let totalScore = 0;

    // Check if the container element exists
    if (questionListContainer) {
      const questions = getFlattenedQuestions(filteredData);
      const totalQuestions = questions.length;
      let currentQuestionIndex = 0;

      function displayCurrentQuestion() {
        // Clear the current content in the questionListContainer
        questionListContainer.innerHTML = "";

        const currentQuestion = questions[currentQuestionIndex];

        // Create list item element
        const listItem = document.createElement("div");
        listItem.classList.add("list-item"); // Optional: Add a class to the list item for styling

        // Create a container for the left side (question)
        const leftContainer = document.createElement("div");
        leftContainer.classList.add("left-container");

        // Create elements for left container
        const questionNumber = document.createElement("p");
        questionNumber.classList.add("question");
        questionNumber.textContent = `Question ${
          currentQuestionIndex + 1
        } of ${totalQuestions}`;

        const questionText = document.createElement("h1");
        questionText.innerHTML = currentQuestion.question;

        // Append elements to the left container
        leftContainer.appendChild(questionNumber);
        leftContainer.appendChild(questionText);

        // Append the left container to the list item
        listItem.appendChild(leftContainer);

        // Create a container for the right side (options and "Submit" button)
        const rightContainer = document.createElement("div");
        rightContainer.classList.add("right-container");

        // Create elements for right container
        const optionsList = document.createElement("ul");
        optionsList.classList.add("options-list");
        currentQuestion.options.forEach((option, index) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${String.fromCharCode(
            65 + index
          )}: ${option}`;

          // Add a click event listener to each option
          listItem.addEventListener("click", () => {
            // Check if the option is already marked
            if (!listItem.classList.contains("marked")) {
              markOption(listItem, option === currentQuestion.answer);
            }
          });

          optionsList.appendChild(listItem);
        });

        // Append options list to the right container
        rightContainer.appendChild(optionsList);

        // Add "Submit" button

        const submitButton = document.createElement("button");
submitButton.textContent = "Submit";
submitButton.addEventListener("click", () => {
    const markedOption = optionsList.querySelector(".marked") as HTMLElement;

    if (!markedOption) {
        // Show an alert if no option is selected
        alert("Please select an option before submitting.");
        return; // Stop further execution
    }

    markAnswer(optionsList, currentQuestion.answer);

    // Change border color based on correctness
    if (markedOption.classList.contains("correct")) {
        markedOption.style.border = '2px solid green'; // Green border for correct answer
    } else {
        markedOption.style.border = '2px solid red'; // Red border for incorrect answer
    }

    showNextButton();
});


        // Append the "Submit" button to the right container
        rightContainer.appendChild(submitButton);

        // Add "Next" button (initially hidden)
        const nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.style.display = "none";
        nextButton.addEventListener("click", () => {
          currentQuestionIndex++;
          if (currentQuestionIndex < totalQuestions) {
            displayCurrentQuestion();
          } else {
            // Handle end of questions, e.g., show total score
            questionListContainer.innerHTML = `<p>All questions answered. Your total score is ${totalScore} out of ${totalQuestions}.</p>`;
            questionListContainer.className="score";
        }
        });

        // Append the "Next" button to the right container
        rightContainer.appendChild(nextButton);

        // Append the right container to the list item
        listItem.appendChild(rightContainer);

        // Append the list item to the main container
        questionListContainer.appendChild(listItem);
      }

      // Initial display
      displayCurrentQuestion();
    } else {
      console.error('Container element with id "question-list" not found.');
    }

    // Function to flatten nested questions array
    function getFlattenedQuestions(data) {
      return data.reduce((acc, curr) => acc.concat(curr.questions), []);
    }

 // Function to mark an option with a border color
function markOption(optionElement: HTMLElement, isCorrect: boolean) {

    if (isCorrect) {
        optionElement.style.border = '2px solid green'; // Mark correct answer with green border
        optionElement.classList.add('marked');
        optionElement.className ="option";
        // Optionally, you can show feedback based on correctness here

        // Update total score for correct answers only
        totalScore++;
    } else {
        optionElement.style.border = '2px solid red'; // Mark incorrect answer with red border
        optionElement.classList.add('marked');
        // Optionally, you can show feedback based on correctness here
    }
}


    // Function to mark the correct answer after submitting
    function markAnswer(optionsList: HTMLUListElement, correctAnswer: string) {
      Array.from(optionsList.children).forEach((optionElement) => {
        if (optionElement instanceof HTMLElement) {
          const optionText = optionElement.textContent || "";
          const option = optionText.split(":")[1].trim();
          if (option === correctAnswer) {
            markOption(optionElement, true);
          }
        }
      });
    }

    // Function to show the "Next" button
    function showNextButton() {
      const nextButton = document.querySelector(
        ".right-container button:last-child"
      ) as HTMLElement | null;
      if (nextButton) {
        nextButton.style.display = "inline-block";
      }
    }
  } catch (e) {
    console.log(e);
  }
});
