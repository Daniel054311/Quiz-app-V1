document.addEventListener("DOMContentLoaded", () => {
  const showScoreButton = document.getElementById(
    "showScoreButton"
  ) as HTMLButtonElement | null;
  const scoreDisplay = document.getElementById(
    "scoreDisplay"
  ) as HTMLElement | null;
  const scoreValue = document.getElementById(
    "scoreValue"
  ) as HTMLElement | null;

  let score = 0; // Initialize the score

  if (showScoreButton && scoreDisplay && scoreValue) {
    showScoreButton.addEventListener("click", () => {
      // In a real-world scenario, you might fetch the score from a global variable or another source
      // For this example, let's generate a random score between 0 and 100
      score = Math.floor(Math.random() * 101);

      // Display the score
      if (scoreValue) {
        scoreValue.textContent = score.toString();
      }

      if (scoreDisplay) {
        scoreDisplay.style.display = "block";
      }
    });
  }
});
