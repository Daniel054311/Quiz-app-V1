interface ApiResponse1 {
  quizzes: quizzes[];
}

interface quizzes {
  title: string;
  ratio: string;
  icon: string;
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
    // Fetch data from the API
    const data: ApiResponse1 = await fetchData();

   
    // Get the current URL
    const currentUrl = window.location.href;

    // Parse the URL to get the search parameters
    const urlParams = new URLSearchParams(new URL(currentUrl).search);
    // Get the value of the 'type' parameter
    const typeParam = urlParams.get("type");

    const title =document.getElementById("title");


    console.log(typeParam);
    // Get the container where you want to display the options
    const optionsContainer = document.getElementById("navigation");

    // Check if the container exists
    if (optionsContainer) {
      // Clear existing content
      optionsContainer.innerHTML = "";

      // Iterate over the options and append them to the container
      data.quizzes.forEach((option) => {
        const listItem = document.createElement("li");
        listItem.className = "image-item";

        // Create the elements for option letter and content
        const title = document.createElement("h1");
        title.className = "content";
        title.textContent = option.title;

        // Add click event listener to the title
        title.addEventListener("click", function () {
          window.location.href = "/question.html?type=" + option.title;
        });

        const img = document.createElement("img");
        img.className = "image";
        img.src = option.icon;

        // Append elements to the list item
        listItem.appendChild(img);
        listItem.appendChild(title);

        // Append the list item to the options container
        optionsContainer.appendChild(listItem);
      });
    }
  } catch (e) {
    console.log(e);
  }
});
