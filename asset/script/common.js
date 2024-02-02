// Dark mode toggle
document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the body element
    var body = document.body;
    // Get a reference to the dark mode toggle button element
    var darkModeToggle = document.getElementById("darkModeToggle");
    var img = document.getElementById("modeToggleImage");
    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
            body.style.backgroundColor = "#313E51";
            body.style.color = "#ffffff";
            img.src = "/images/pattern-background-desktop-dark.svg";
        }
        else {
            body.style.backgroundColor = "#f4f6fA";
            body.style.color = "#313E51";
            img.src = "/images/pattern-background-desktop-dark.svg";
        }
    });
    document.addEventListener("DOMContentLoaded", function () {
        var body = document.body;
        var darkModeToggle = document.getElementById("darkModeMoon");
        var darkModeMoon = document.getElementById("darkModeMoon");
        var darkModeSun = document.getElementById("darkModeSun");
        var lightModeMoon = document.getElementById("darkModeMoon");
        var lightModeSun = document.getElementById("lightModeSun");
        // Initial setup based on dark mode status
        updateMoonSunIcons();
        darkModeToggle.addEventListener("clisk", function () {
            body.classList.toggle("dark-mode");
            // Update moon and sun icons based on dark mode status
            updateMoonSunIcons();
        });
        function updateMoonSunIcons() {
            var isDarkMode = body.classList.contains("dark-mode");
            // Show/hide moon and sun based on dark mode status
            darkModeMoon.style.display = isDarkMode ? "block" : "none";
            darkModeSun.style.display = isDarkMode ? "none" : "block";
            lightModeMoon.style.display = isDarkMode ? "none" : "block";
            lightModeSun.style.display = isDarkMode ? "block" : "none";
        }
    });
});
