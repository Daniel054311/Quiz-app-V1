interface ApiResponse1 {
  quizzes: quizzes[];
}

interface quizzes {
  title: string;
  color: string;
  icon: string;
  backgroundColor: string;
}

// Function to make a Fetch API call for Interface 1
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

    console.log(data);

    // Get the container where you want to display the options
    const optionsContainer = document.getElementById("navigation");

    // Check if the container exists
    if (optionsContainer) {
      // Clear existing content
      optionsContainer.innerHTML = "";

      // Iterate over the options and append them to the container
      data.quizzes.forEach((option) => {
        const listItem = document.createElement("li");
        listItem.className = "list-item";

        // Create the elements for option letter and content
        const title = document.createElement("h1");
        title.className = "content";
        title.textContent = option.title;

        

        const img = document.createElement("img");
        img.className = "image";
        img.src = option.icon;
        img.style.backgroundColor = option.color;

        console.log(option.color);

        

        // Append elements to the list item
        listItem.appendChild(img);
        listItem.appendChild(title);

        // Add click event listener to the title
        listItem.addEventListener("click", function () {
          window.location.href='/question.html?type='+option.title;
        });

        // Append the list item to the options container
        optionsContainer.appendChild(listItem);
      });
    }
  } catch (e) {
    console.log(e);
  }
  
});
