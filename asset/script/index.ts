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

// Function to render quizzes
function renderQuizzes(data: ApiResponse1, isDarkMode: boolean) {
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

      // Apply background color based on isDarkMode
      listItem.style.backgroundColor = isDarkMode ? "#3b4c66" : "white";
      listItem.style.color = isDarkMode ? "#fff" : "#313e51";

      const darkModeSun = document.getElementById("darkModeSun") as HTMLImageElement;
    const darkModeMoon = document.getElementById("darkModeMoon") as HTMLImageElement;


      // Update dark mode icons
      darkModeSun.src = isDarkMode ? "/images/icon-sun-light.svg" : "/images/icon-sun-dark.svg";
      darkModeMoon.src = isDarkMode ? "/images/icon-moon-light.svg" : "/images/icon-moon-dark.svg";

      // Create the elements for option letter and content
      const title = document.createElement("h1");
      title.className = "content";
      title.textContent = option.title;

      const img = document.createElement("img");
      img.className = "image";
      img.src = option.icon;
      img.style.backgroundColor = option.color;

      // Append elements to the list item
      listItem.appendChild(img);
      listItem.appendChild(title);

      // Add click event listener to the title
      listItem.addEventListener("click", function () {
        window.location.href = "/question.html?type=" + option.title;
      });

      // Append the list item to the options container
      optionsContainer.appendChild(listItem);
    });
  }
}

// Document ready event listener
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch data from the API
    const data: ApiResponse1 = await fetchData();

    // Define a variable to track the dark mode status
    let isDarkMode = false;

    // Render quizzes with isDarkMode initially set to false
    renderQuizzes(data, isDarkMode);

    // Dark mode toggle
    document.getElementById("darkModeToggle")?.addEventListener("click", () => {
      // Toggle the dark mode status
      isDarkMode = !isDarkMode;

      // Set background color and image based on dark mode status
      document.body.style.backgroundColor = isDarkMode ? "#313E51" : "#F4F6FA";
      document.body.style.backgroundImage = isDarkMode ? 'url("/images/pattern-background-desktop-dark.svg")' : 'url("/images/pattern-background-desktop-light.svg")';

      // Optionally, adjust text color based on dark mode status
      document.body.style.color = isDarkMode ? "#ffffff" : "#313e51";

      // Render quizzes with updated isDarkMode status
      renderQuizzes(data, isDarkMode);
    });
  } catch (e) {
    console.log(e);
  }
});
