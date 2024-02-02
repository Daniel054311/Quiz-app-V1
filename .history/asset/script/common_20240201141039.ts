// common.ts

function initializeDarkMode() {
    // Get a reference to the body element
    const body = document.body;
  
    // Get a reference to the dark mode toggle button element
    const darkModeToggle = document.getElementById("darkModeToggle") as HTMLElement;
  
    const img = document.getElementById("modeToggleImage") as HTMLImageElement;
  
    darkModeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
  
      // Update moon and sun icons based on dark mode status
      updateMoonSunIcons();
  
      // Update background color and text color based on dark mode status
      const isDarkMode = body.classList.contains("dark-mode");
      body.style.backgroundColor = isDarkMode ? "#313E51" : "#f4f6fA";
      body.style.color = isDarkMode ? "#ffffff" : "#313E51";
    });
  }
  
  function updateMoonSunIcons() {
    // Get references to moon and sun images
    const darkModeMoon = document.getElementById("darkModeMoon") as HTMLImageElement;
    const darkModeSun = document.getElementById("darkModeSun") as HTMLImageElement;
    const lightModeMoon = document.getElementById("lightModeMoon") as HTMLImageElement;
    const lightModeSun = document.getElementById("lightModeSun") as HTMLImageElement;
  
    // Get a reference to the body element
    const body = document.body;
  
    const isDarkMode = body.classList.contains("dark-mode");
  
    // Show/hide moon and sun based on dark mode status
    darkModeMoon.style.display = isDarkMode ? "block" : "none";
    darkModeSun.style.display = isDarkMode ? "none" : "block";
    lightModeMoon.style.display = isDarkMode ? "none" : "block";
    lightModeSun.style.display = isDarkMode ? "block" : "none";
  }
  
  // Call initializeDarkMode to set up the initial state
  document.addEventListener("DOMContentLoaded", () => {
    initializeDarkMode();
  });
  