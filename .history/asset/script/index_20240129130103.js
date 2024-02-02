document.addEventListener('DOMContentLoaded', () => {
    const htmlLink = document.getElementById('htmlLink');
    const questionContainer = document.getElementById('questionContainer');

    htmlLink.addEventListener('click', async () => {
        try {
            // Fetch questions from data.json
            const response = await fetch('./data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const questions = await response.json();

            // Display questions in the question container
            questionContainer.innerHTML = questions.map((question, index) => `
                <div class="question">
                    <p>${index + 1}. ${question.question}</p>
                    <ul>
                        ${question.options.map(option => `<li>${option}</li>`).join('')}
                    </ul>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error fetching questions:', error);
            // Handle the error (e.g., show an error message to the user)
        }
    });
});
