// // common.ts

// function initializeDarkMode() {
//     const body = document.body;
//     const darkModeToggle = document.getElementById("darkModeToggle") as HTMLElement;
//     const img = document.getElementById("modeToggleImage") as HTMLImageElement;
  
//     darkModeToggle.addEventListener("click", () => {
//       body.classList.toggle("dark-mode");
      
//       // Update moon and sun icons based on dark mode status
//       updateMoonSunIcons();
  
//       // Update background color and text color based on dark mode status
//       const isDarkMode = body.classList.contains("dark-mode");
//       body.style.backgroundColor = isDarkMode ? "#313E51" : "#f4f6fA";
//       body.style.color = isDarkMode ? "#ffffff" : "#313E51";
  
//       // Update image source based on dark mode status
//       img.src = isDarkMode ? "/images/pattern-background-desktop-dark.svg" : "/images/pattern-background-desktop-dark.svg";
//     });
  
//     // Initial setup based on dark mode status
//     updateMoonSunIcons();
//   }
  
//   function updateMoonSunIcons() {
//     const body = document.body;
//     const darkModeMoon = document.getElementById("darkModeMoon") as HTMLImageElement;
//     const darkModeSun = document.getElementById("darkModeSun") as HTMLImageElement;
//     const lightModeMoon = document.getElementById("lightModeMoon") as HTMLImageElement;
//     const lightModeSun = document.getElementById("lightModeSun") as HTMLImageElement;
  
//     const isDarkMode = body.classList.contains("dark-mode");
  
//     // Show/hide moon and sun based on dark mode status
//     darkModeMoon.style.display = isDarkMode ? "block" : "none";
//     darkModeSun.style.display = isDarkMode ? "none" : "block";
//     lightModeMoon.style.display = isDarkMode ? "none" : "block";
//     lightModeSun.style.display = isDarkMode ? "block" : "none";
//   }
  
//   // Call initializeDarkMode to set up the initial state
//   document.addEventListener("DOMContentLoaded", () => {
//     initializeDarkMode();
//   });
  

  
// export { initializeDarkMode, updateMoonSunIcons };
// export {};

  
  