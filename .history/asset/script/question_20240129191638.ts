// question.ts

// Define an interface for the expected data structure
export interface Option {
  optionLetter: string;
  ratio: string;
  backgroundColor: string;
}

export interface Question {
  questionNumber: string;
  questionText: string;
  options: Option[];
}

async function fetchData(): Promise<ApiResponse1> {
    try {
      const response = await fetch("./data.json");
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data: ApiResponse1 = await response.json();
      return data;
      console.log(data);
    } catch (error) {
      console.error("Error fetching data1:", error.message);
      throw error;
    }
  }
