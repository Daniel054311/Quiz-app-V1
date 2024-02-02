// Define an interface for the expected data structure
interface ApiResponse {
    message: string;
}

// Function to make a Fetch API call
async function fetchData(subject: string): Promise<ApiResponse> {
    try {
        const response = await fetch(`./store/${subject}.json`);

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
    const questionContainer = document.getElementById('questionContainer')!;

    // Now you can use these variables without TypeScript complaining about null

    htmlLink.addEventListener('click', async () => {
        try {
            const data = await fetchData('html');
            console.log('HTML Data received:', data);

            // Use 'data' to update your questionContainer or perform other actions
        } catch (error) {
            console.error('Error fetching HTML data:', error);
            // Handle the error (e.g., show an error message to the user)
        }
    });

    cssLink.addEventListener('click', async () => {
        try {
            const data = await fetchData('css');
            console.log('CSS Data received:', data);

            // Use 'data' to update your questionContainer or perform other actions
        } catch (error) {
            console.error('Error fetching CSS data:', error);
            // Handle the error (e.g., show an error message to the user)
        }
    });

    javascriptLink.addEventListener('click', async () => {
        try {
            const data = await fetchData('javascript');
            console.log('JavaScript Data received:', data);

            // Use 'data' to update your questionContainer or perform other actions
        } catch (error) {
            console.error('Error fetching JavaScript data:', error);
            // Handle the error (e.g., show an error message to the user)
        }
    });

    accessibilityLink.addEventListener('click', async () => {
        try {
            const data = await fetchData('accessibility');
            console.log('Accessibility Data received:', data);

            // Use 'data' to update your questionContainer or perform other actions
        } catch (error) {
            console.error('Error fetching Accessibility data:', error);
            // Handle the error (e.g., show an error message to the user)
        }
    });
});
