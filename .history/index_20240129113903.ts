// Define an interface for the expected data structure
interface ApiResponse {
    // Adjust the properties based on the actual structure of your data
    quizzes: {
        title: string;
        icon: string;
        questions: Array<Question>;
    }[];
}

interface Question {
    question: string;
    options: string[];
    answer: string;
}

// Function to make a Fetch API call
async function fetchData(subject: string): Promise<ApiResponse> {
    try {
        const response = await fetch(`./data.json`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching ${subject} data:`, error.message);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Use non-null assertion operator (!) to tell TypeScript that the element will not be null
    const htmlLink = document.querySelector('a[href="#html"]')!;
    const cssLink = document.querySelector('a[href="#css"]')!;
    const javascriptLink = document.querySelector('a[href="#javascript"]')!;
    const accessibilityLink = document.querySelector('a[href="#accessibility"]')!;

    // Now you can use these variables without TypeScript complaining about null

    htmlLink.addEventListener('click', async () => {
        console.log('HTML Link Clicked');
        const htmlData = await fetchData('html');
        console.log('Data received:', htmlData);
        // Process and display HTML questions
    });

    cssLink.addEventListener('click', async () => {
        const cssData = await fetchData('css');
        // Process and display CSS questions
    });

    javascriptLink.addEventListener('click', async () => {
        const javascriptData = await fetchData('javascript');
        // Process and display JavaScript questions
    });

    accessibilityLink.addEventListener('click', async () => {
        const accessibilityData = await fetchData('accessibility');
        // Process and display Accessibility questions
    });
});
