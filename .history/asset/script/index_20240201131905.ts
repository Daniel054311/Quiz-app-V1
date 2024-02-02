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
function renderQuizzes(data: ApiResponse1) {
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

    console.log(data);

    // Render quizzes
    renderQuizzes(data);
  } catch (e) {
    console.log(e);
  }
});

// Dark mode toggle
document.addEventListener("DOMContentLoaded", () => {
  // Get a reference to the body element
  const body = document.body;

  // Get a reference to the dark mode toggle button element
  const darkModeToggle = document.getElementById("darkModeToggle") as HTMLElement;

  const img=document.getElementById("modeToggleImage") as HTMLImageElement;

  darkModeToggle.addEventListener("click", () =>{
    body.classList.toggle("dark-mode");
    if(body.classList.contains("dark-mode")){

      body.style.backgroundColor = "#313E51";
      body.style.color ="#ffffff";
      img.src = "/images/pattern-background-desktop-dark.svg";
    }else{
      body.style.backgroundColor="#f4f6fA";
      body.style.color ="#313E51";
      img.src="/images/pattern-background-desktop-dark.svg";
    }

  })
  document

  
    });
  

