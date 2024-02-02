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

/// Assuming you have a container element with id "question-list"
const questionListContainer = document.getElementById('question-list');

// Check if the container element exists
if (questionListContainer !== null) {
    filteredData.forEach(data => {
        data.questions.forEach(question => {
            // Create list item element
            const listItem = document.createElement('li');

            // Assuming question is an object with properties question, options, and answer
            const questionText = question.question;
            const options = question.options;

            // Create a container for question and options
            const questionContainer = document.createElement('div');

            // Create elements for question and options
            const questionElement = document.createElement('span');
            const optionsElement = document.createElement('span');

            // Set the text content for question and options
            questionElement.textContent = questionText;
            optionsElement.textContent = `Options: ${options.join(', ')}`;

            // Append question and options elements to the container
            questionContainer.appendChild(questionElement);
            questionContainer.appendChild(optionsElement);

            // Append the container to the list item
            listItem.appendChild(questionContainer);

            // Append the list item to the container
            questionListContainer.appendChild(listItem);
        });
    });
} else {
    console.error('Container element with id "question-list" not found.');
}




    
 
  } catch (e) {
    console.log(e);
  }
});
