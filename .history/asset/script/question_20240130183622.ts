interface ApiResponse1 {
    quizzes: quizzes[],
   
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
const questionListContainer = document.getElementById('question-list')!;

// Check if the container element exists
if (questionListContainer) {
    const questions = getFlattenedQuestions(filteredData);
    const totalQuestions = questions.length;
    let currentQuestionIndex = 0;

    function displayCurrentQuestion() {
        // Clear the current content in the questionListContainer
        questionListContainer.innerHTML = '';

        const currentQuestion = questions[currentQuestionIndex];

        // Create list item element
        const listItem = document.createElement('div');
        listItem.classList.add('list-item'); // Optional: Add a class to the list item for styling

        // Create a container for the left side (question and "Next" button)
        const leftContainer = document.createElement('div');
        leftContainer.classList.add('left-container');

        // Create elements for left container
        const questionNumber = document.createElement('p');
        questionNumber.classList.add('question');
        questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;

        const questionText = document.createElement('h1');
        questionText.innerHTML = currentQuestion.question;

        // Add "Next" button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < totalQuestions) {
                displayCurrentQuestion();
            } else {
                // Handle end of questions, e.g., show a message or perform some action
                questionListContainer.innerHTML = '<p>All questions answered. Thank you!</p>';
            }
        });

        // Append elements to the left container
        leftContainer.appendChild(questionNumber);
        leftContainer.appendChild(questionText);
        

        // Append the left container to the list item
        listItem.appendChild(leftContainer);

        // Create a container for the right side (options)
        const rightContainer = document.createElement('div');
        rightContainer.classList.add('right-container');

        // Create elements for right container
        const optionsText = document.createElement('p');
        optionsText.textContent = `Options: ${currentQuestion.options.join(', ')}`;

        // Append elements to the right container
        rightContainer.appendChild(optionsText);
        

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


    
 
  } catch (e) {
    console.log(e);
  }
});
