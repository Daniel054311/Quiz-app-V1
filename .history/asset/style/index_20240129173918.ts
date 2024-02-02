// Define interfaces for the expected data structures
interface ApiResponse1 {
    message: string;
    bgColor: string;
}

interface ApiResponse2 {
    message: string;
    bgColor: string;
}

// Function to make a Fetch API call for Interface 1
async function fetchData1(): Promise<ApiResponse1> {
    try {
        const response = await fetch('./store/data1.json');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: ApiResponse1 = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data1:', error.message);
        throw error;
    }
}

// Function to make a Fetch API call for Interface 2


document.addEventListener('DOMContentLoaded', () => {
    // Use non-null assertion operator (!) to tell TypeScript that the element will not be null
    const toggleButton = document.getElementById('toggleButton')!;
    const contentContainer = document.getElementById('contentContainer')!;

    let isInterface1 = true;

    // Toggle background color and fetch data accordingly
    toggleButton.addEventListener('click', async () => {
        try {
            // Toggle between interfaces
            isInterface1 = !isInterface1;

            // Fetch data based on the current interface
            const data = isInterface1 ? await fetchData1() : await fetchData2();

            // Update content and background color
            contentContainer.textContent = data.message;
            contentContainer.style.backgroundColor = data.bgColor;

        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error (e.g., show an error message to the user)
        }
    });
});
