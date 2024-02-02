// Define an interface for the expected data structure
interface ApiResponse {
    // Define your expected properties here
    // For example, assuming there's a 'message' property in the response
    message: string;
}

// Function to make a Fetch API call
async function fetchData(): Promise<ApiResponse> {
    try {
        const response = await fetch('../store/data.json');
        asset/script/index.ts
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
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
}

        const data: ApiResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error; // Re-throw the error to handle it at the caller level
    }
}

// Example usage
fetchData()
    .then(data => {
        console.log('Data received:', data);
        // Do something with the data
    })
    .catch(error => {
        console.error('Error in fetch operation:', error);
        // Handle the error
    });
