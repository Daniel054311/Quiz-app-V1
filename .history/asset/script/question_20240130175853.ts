interface ApiResponse1 {
    quizzes: quizzes[],
   
}

interface quizzes {

  title: string;
  icon: string;
  questions:string[],
  options:string[],
  answer:string,
  
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

    let currentQuestionIndex = 0;

    function displayQuestion() {
        const currentQuestion = filteredData[currentQuestionIndex].questions[0];
        const leftContainer = document.querySelector('.left-container');
        const rightContainer = document.querySelector('.right-container');
        const questionPage = document.querySelector('#question-page');

        // Display question on the left side
        leftContainer.innerHTML = `
            <p class="question">Question ${currentQuestionIndex + 1} of ${filteredData.length}</p>
            <h1>${currentQuestion.questionText}</h1>
        `;

        // Display options on the right side
        const optionsHTML = currentQuestion.options.map(option => `<div>${option}</div>`).join('');
        rightContainer.innerHTML = `
            <div class="options">${optionsHTML}</div>
        `;

        // Display navigation buttons
        questionPage.innerHTML = `
            <button onclick="navigate(-1)">Previous</button>
            <button onclick="navigate(1)">Next</button>
        `;
    }

    function navigate(direction) {
        currentQuestionIndex += direction;
        if (currentQuestionIndex < 0) {
            currentQuestionIndex = 0;
        } else if (currentQuestionIndex >= filteredData.length) {
            currentQuestionIndex = filteredData.length - 1;
        }
        displayQuestion();
    }

    // Initial display
    displayQuestion();

   

 
  } catch (e) {
    console.log(e);
  }
});
