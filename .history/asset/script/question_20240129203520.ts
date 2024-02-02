interface ApiResponse1 {
    quizzes: quizzes[],
   
}

interface quizzes {

  title: string;
  icon: string;
  questions:string[


  ],
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

  
    filteredData.forEach(data => {
        data.questions.forEach(question => {

             console.log(question);
        });
       
   });

    // Get the container where you want to display the options
    const optionsContainer = document.getElementById("questions");

    // Check if the container exists
    if (optionsContainer) {
      // Clear existing content
      optionsContainer.innerHTML = "";

      // Iterate over the options and append them to the container
      filteredData.forEach(data => {
        data.questions.forEach(question => {
        const listItem = document.createElement("li");
        listItem.className = "option-item";

        
        const content = document.createElement("div");
        content.className = "content";
        content.textContent = data.questions;

        // Append elements to the list item
        // listItem.appendChild(img);

        // Append the list item to the options container
        optionsContainer.appendChild(listItem);
        });
       
   })
    }
  } catch (e) {
    console.log(e);
  }
});
