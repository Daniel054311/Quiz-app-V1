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
async function fetchData(): Promise<ApiResponse1> {
    try {
        const response = await fetch('./data.json');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: ApiResponse1 = await response.json();

        console.log(data);
        return data;
        
    } catch (error) {
        console.error('Error fetching data1:', error.message);
        throw error;
    }


}

fetchData();
document.addEventListener('DOMContentLoaded', () => {
    // Get the container where you want to display the options
    const optionsContainer = document.getElementById('questionOptions');

    // Check if the container exists
    if (optionsContainer) {

        alert()
    }
        
});

