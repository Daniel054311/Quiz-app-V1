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

     

        // Append the left container to the list item
        listItem.appendChild(leftContainer);

        // Create a container for the right side (options and "Next" button)
       
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


    
 
  } catch (e) {
    console.log(e);
  }
});