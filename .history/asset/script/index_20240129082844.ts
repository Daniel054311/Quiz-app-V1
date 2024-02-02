// Define an interface for the expected data structure
interface ApiResponse {
    // Define your expected properties here
    // For example, assuming there's a 'message' property in the response
    message: string;
}

// Function to make a Fetch API call
async function fetchData(): Promise<ApiResponse> {
    try {
        const response = await fetch('');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
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
