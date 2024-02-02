
// // Dark mode toggle
// document.addEventListener("DOMContentLoaded", () => {
//     // Get a reference to the body element
//     const body = document.body;
  
//     // Get a reference to the dark mode toggle button element
//     const darkModeToggle = document.getElementById("darkModeToggle") as HTMLElement;
  
//     const img=document.getElementById("modeToggleImage") as HTMLImageElement;
  
//     darkModeToggle.addEventListener("click", () =>{
//       body.classList.toggle("dark-mode");
//       if(body.classList.contains("dark-mode")){
  
//         body.style.backgroundColor = "#313E51";
//         body.style.color ="#ffffff";
//         img.src = "/images/pattern-background-desktop-dark.svg";
//       }else{
//         body.style.backgroundColor="#f4f6fA";
//         body.style.color ="#313E51";
//         img.src="/images/pattern-background-desktop-dark.svg";
//       }
  
//     })
//     document.addEventListener("DOMContentLoaded", () => {
//       const body = document.body;
//       const darkModeToggle = document.getElementById("darkModeMoon") as HTMLImageElement;
//       const darkModeMoon = document.getElementById("darkModeMoon") as HTMLImageElement;
//       const darkModeSun = document.getElementById("darkModeSun") as HTMLImageElement;
//       const lightModeMoon = document.getElementById("darkModeMoon") as HTMLImageElement;
//       const lightModeSun = document.getElementById("lightModeSun") as HTMLImageElement;
  
//       // Initial setup based on dark mode status
//       updateMoonSunIcons();
      
//       darkModeToggle.addEventListener("clisk", () => {
//         body.classList.toggle("dark-mode");
  
//         // Update moon and sun icons based on dark mode status
//         updateMoonSunIcons();
//       });
//       function updateMoonSunIcons(){
//         const isDarkMode = body.classList.contains("dark-mode");
  
//         // Show/hide moon and sun based on dark mode status
//       darkModeMoon.style.display = isDarkMode ? "block" : "none";
//       darkModeSun.style.display = isDarkMode ? "none" : "block";
//       lightModeMoon.style.display = isDarkMode ? "none" : "block";
//       lightModeSun.style.display = isDarkMode ? "block" : "none";
      
//       }
  
//     })
  
    
//       });
  
  
  
    
      
  
    
  
  