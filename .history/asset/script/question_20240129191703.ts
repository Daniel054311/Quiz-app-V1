interface ApiResponse1 {
    quizzes: quizzes[];
  }
  
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
      console.log(data);
      return data;
      
    } catch (error) {
      console.error("Error fetching data1:", error.message);
      throw error;
    }
  }
