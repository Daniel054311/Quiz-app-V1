// completed.ts

document.addEventListener('DOMContentLoaded', () => {
    // In a real-world scenario, you might fetch the score and total questions from a global variable or another source
    // For this example, let's generate random values
    const score = Math.floor(Math.random() * 101);
    const totalQuestions = 10; // Change this to the actual total number of questions

    // Display the score over the total number of questions
    const scoreText = `You scored ${score} out of ${totalQuestions}`;
    scoreText
    alert(scoreText); // You can replace this with any other display mechanism you prefer
});
