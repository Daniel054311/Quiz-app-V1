// Define an interface for the expected data structure
interface ApiResponse {
    // Define your expected properties here
    // For example, assuming there's a 'message' property in the response
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
        throw error; // Re-throw the error to handle it at the caller level
    }
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
    const htmlLink = document.querySelector('a[href="#html"]');
    const cssLink = document.querySelector('a[href="#css"]');
    const javascriptLink = document.querySelector('a[href="#javascript"]');
    const accessibilityLink = document.querySelector('a[href="#accessibility"]');

    htmlLink.addEventListener('click', async () => {
        try {
            const htmlData = await fetchData('html');
            console.log('HTML Questions:', htmlData);
            // Update your UI to display HTML questions
        } catch (error) {
            console.error('Error handling HTML click:', error);
            // Handle the error
        }
    });

    cssLink.addEventListener('click', async () => {
        try {
            const cssData = await fetchData('css');
            console.log('CSS Questions:', cssData);
            // Update your UI to display CSS questions
        } catch (error) {
            console.error('Error handling CSS click:', error);
            // Handle the error
        }
    });

    javascriptLink.addEventListener('click', async () => {
        try {
            const javascriptData = await fetchData('javascript');
            console.log('JavaScript Questions:', javascriptData);
            // Update your UI to display JavaScript questions
        } catch (error) {
            console.error('Error handling JavaScript click:', error);
            // Handle the error
        }
    });

    accessibilityLink.addEventListener('click', async () => {
        try {
            const accessibilityData = await fetchData('accessibility');
            console.log('Accessibility Questions:', accessibilityData);
            // Update your UI to display Accessibility questions
        } catch (error) {
            console.error('Error handling Accessibility click:', error);
            // Handle the error
        }
    });
});
