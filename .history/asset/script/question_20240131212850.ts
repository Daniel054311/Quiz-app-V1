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
    var alphabetSpan;
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
          console.error(
            'Image element with id "head_img" not found or imageUrl not available.'
          );
        }

        function displayCurrentQuestion() {
          questionListContainer.innerHTML = "";

          const currentQuestion =
            filteredData[0].questions[currentQuestionIndex];

          const listItem = document.createElement("div");
          listItem.classList.add("list-item");

          const leftContainer = document.createElement("div");
          leftContainer.classList.add("left-container");

          const questionNumber = document.createElement("p");
          questionNumber.classList.add("question");
          questionNumber.textContent = `Question ${
            currentQuestionIndex + 1
          } of ${filteredData[0].questions.length}`;

          const questionText = document.createElement("h1");
          questionText.innerHTML = currentQuestion.question;

          leftContainer.appendChild(questionNumber);
          leftContainer.appendChild(questionText);

          listItem.appendChild(leftContainer);

          const optionsContainer = document.createElement("div");
          optionsContainer.classList.add("options-container");

          // Add the missing declaration for optionsList
          const optionsList = document.createElement("ul");
          optionsList.classList.add("options-list");

          currentQuestion.options.forEach((option, index) => {
            const listItem = document.createElement("li");
          
            // Create a span for the alphabet
            const alphabetSpan = document.createElement("span");
            alphabetSpan.textContent = String.fromCharCode(65 + index);
            alphabetSpan.className = 'letter';
          
            // Set the option text content
            const optionText = document.createElement("span");
            optionText.textContent = option;
          
            // Append both the alphabet and option to the list item
            listItem.appendChild(alphabetSpan);
            listItem.appendChild(optionText);
          
            // Create spans for cross and tick icons
            const crossIcon = document.createElement("img");
            crossIcon.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 5C21.9698 5 23.9204 5.38799 25.7403 6.14181C27.5601 6.89563 29.2137 8.00052 30.6066 9.3934C31.9995 10.7863 33.1044 12.4399 33.8582 14.2597C34.612 16.0796 35 18.0302 35 20C35 21.9698 34.612 23.9204 33.8582 25.7403C33.1044 27.5601 31.9995 29.2137 30.6066 30.6066C29.2137 31.9995 27.5601 33.1044 25.7403 33.8582C23.9204 34.612 21.9698 35 20 35C16.0218 35 12.2064 33.4196 9.3934 30.6066C6.58035 27.7936 5 23.9782 5 20C5 16.0218 6.58035 12.2064 9.3934 9.3934C12.2064 6.58035 16.0218 5 20 5ZM20 7.5C16.6848 7.5 13.5054 8.81696 11.1612 11.1612C8.81696 13.5054 7.5 16.6848 7.5 20C7.5 23.3152 8.81696 26.4946 11.1612 28.8388C13.5054 31.183 16.6848 32.5 20 32.5C23.3152 32.5 26.4946 31.183 28.8388 28.8388C31.183 26.4946 32.5 23.3152 32.5 20C32.5 16.6848 31.183 13.5054 28.8388 11.1612C26.4946 8.81696 23.3152 7.5 20 7.5ZM14.5975 14.915L14.74 14.74C14.9471 14.5333 15.2202 14.4058 15.5117 14.3798C15.8031 14.3538 16.0945 14.4308 16.335 14.5975L16.51 14.74L20 18.2325L23.49 14.74C23.6971 14.5333 23.9702 14.4058 24.2617 14.3798C24.5531 14.3538 24.8445 14.4308 25.085 14.5975L25.26 14.74C25.4667 14.9471 25.5942 15.2202 25.6202 15.5117"
            
            const tickIcon = document.createElement("span");
            tickIcon.innerHTML = '<i class="fas fa-check"></i>'; // Assuming Font Awesome is used
          
            // Append icons to the list item
            listItem.appendChild(crossIcon);
            listItem.appendChild(tickIcon);
          
            listItem.addEventListener("click", () => {
              if (!listItem.classList.contains("marked")) {
                markOption(optionsList, listItem);
              }
            });
          
            optionsList.appendChild(listItem);
          });
          
          

          const submitButton = document.createElement("button");
          submitButton.className = "submit";
          submitButton.textContent = "Submit Answer";
          submitButton.addEventListener("click", () => {
            const markedOption = optionsList.querySelector(
              ".marked"
            ) as HTMLElement;

            if (!markedOption) {
              alert("Please select an option before submitting.");
              return;
            }

            totalScore += markAnswer(optionsList, currentQuestion.answer);

            // Hide the "Submit" button
            submitButton.style.display = "none";

            // Disable further clicks on options
            optionsList.querySelectorAll("li").forEach((option) => {
              option.removeEventListener("click", optionClickHandler);
            });

            // Show the "Next" button
            nextButton.style.display = "block";
          });

          const nextButton = document.createElement("button");
          nextButton.textContent = "Next Question";
          nextButton.style.display = "none";
          nextButton.className = "nextButton";
          nextButton.addEventListener("click", () => {
            // Handle moving to the next question or finishing the quiz

            // Reset styles for the next question
            optionsList.querySelectorAll("li").forEach((option) => {
              option.style.border = "";
              option.classList.remove("marked", "correct", "wrong");
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

          // Event handler for option clicks
          function optionClickHandler() {
            const isAlreadyMarked = this.classList.contains("marked");

            // Only mark the option if it's not already marked
            if (!isAlreadyMarked) {
              markOption(optionsList, this);
            }
          }

          // Attach click event to options
          optionsList.querySelectorAll("li").forEach((option) => {
            option.addEventListener("click", optionClickHandler);
          });
        }

        displayCurrentQuestion();
      } else {
        console.error("No quiz found with the specified type.");
      }
    } else {
      console.error('Container element with id "question-list" not found.');
    }
  } catch (e) {
    console.log(e);
  }
});

function markOption(optionsList: HTMLUListElement, optionElement: HTMLElement) {
  // Check if any option is already marked
  const markedOption = optionsList.querySelector(".marked") as HTMLElement;

  if (markedOption || optionElement.classList.contains("marked")) {
    // Remove the "marked" class from the previously marked option
    markedOption.classList.remove("marked");
    markedOption.style.border = ""; // Clear the previous border style

    // Return without marking the current option if it's already marked
    return;
  }

  // Only change the border color to purple when an option is clicked
  optionElement.style.border = "2px solid rgba(167, 41, 245, 1)";

  // Add the "marked" class to the current option
  optionElement.classList.add("marked");
}
function markAnswer(optionsList: HTMLUListElement, correctAnswer: string): number {
  let score = 0;

  // Function to mark the correct answer after submitting
  optionsList.querySelectorAll("li").forEach((option, index) => {
    const alphabetSpan = option.querySelector(".letter") as HTMLElement;

    if (option.textContent?.endsWith(correctAnswer)) {
      if (option.classList.contains("marked")) {
        // Mark the selected option as correct
        option.classList.add("correct");
        option.style.border = "2px solid green";
        alphabetSpan.style.backgroundColor = "green";
        alphabetSpan.style.color='white'

        score += 1;
      } else {
        // Mark the correct option
        option.style.border = "2px solid green";
        option.classList.add("correct");
        alphabetSpan.style.backgroundColor = "#26D782";
        alphabetSpan.style.color='white'

      }
    } else if (option.classList.contains("marked")) {
      // Mark the selected option as wrong
      option.style.border = "2px solid red";
      option.classList.add("wrong");
      alphabetSpan.style.backgroundColor = "red"
      alphabetSpan.style.color='white'

    }
  });

  return score;
}



