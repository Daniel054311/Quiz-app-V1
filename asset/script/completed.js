// completed.ts
document.addEventListener('DOMContentLoaded', function () {
    // In a real-world scenario, you might fetch the score and total questions from a global variable or another source
    // For this example, let's generate random values
    var score = Math.floor(Math.random() * 101);
    var totalQuestions = 10; // Change this to the actual total number of questions
    // Display the score over the total number of questions
    var scoreText = "You scored ".concat(score, " out of ").concat(totalQuestions);
    alert(scoreText);
    // You can replace this with any other display mechanism you prefer
});
