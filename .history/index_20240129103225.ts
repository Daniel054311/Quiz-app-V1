// Define an interface for the expected data structure
interface ApiResponse {
    message: string;
}

// Function to make a Fetch API call
async function fetchData(subject: string): Promise<ApiResponse> {
    try {
        console.log('Before')
        const response = await fetch(`./store/data.json`);

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

    htmlLink.addEventListener('click', () => {
        fetchData('html');
    });

    cssLink.addEventListener('click', () => {
        fetchData('css');
    });

    javascriptLink.addEventListener('click', () => {
        fetchData('javascript');
    });

    accessibilityLink.addEventListener('click', () => {
        fetchData('accessibility');
    });
});
