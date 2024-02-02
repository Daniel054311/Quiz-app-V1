interface ApiResponse1 {
    options: Option[];
}

interface Option {
    optionLetter: string;
    ratio: string;
    backgroundColor: string;
}


// Function to make a Fetch API call for Interface 1
async function fetchData(): Promise<ApiResponse1> {
    try {
        const response = await fetch('./data.json');

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

fetchData();

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch data from the API
        const data: ApiResponse1 = await fetchData();

        // Get the container where you want to display the options
        const optionsContainer = document.getElementById('questionOptions');

        // Check if the container exists
        if (optionsContainer) {
            // Clear existing content
            optionsContainer.innerHTML = '';

            // Iterate over the options and append them to the container
            data.options.forEach(option => {
                const listItem = document.createElement('li');
                listItem.className = 'option-item';

                // Create the elements for option letter and content
                const optionLetter = document.createElement('h1');
                optionLetter.className = 'options';
                optionLetter.textContent = option.optionLetter;

                const content = document.createElement('div');
                content.className = 'content';
                content.style.backgroundColor = option.backgroundColor;
                content.textContent = option.ratio;

                // Append elements to the list item
                listItem.appendChild(optionLetter);
                listItem.appendChild(content);

                // Append the list item to the options container
                optionsContainer.appendChild(listItem);
            });
        }
    }catch(){

    }

});