import axios from "axios";

export class ApiService {
  static BASE_URL = "http://localhost:8080/yogaIsRemedy";

  static async getRemedy(prompt) {
    try {
      console.log(`Sending request to: ${ApiService.BASE_URL}/${prompt}`); // Clearer log
      const response = await axios.get(`${ApiService.BASE_URL}/${encodeURIComponent(prompt)}`);
      console.log('Response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error during API call:', error);

      // Handle specific error cases
      if (error.response) {
        console.error('Server error:', error.response.status, error.response.data);
        return { error: true, message: error.response.data.message || 'An error occurred on the server' };
      } else if (error.request) {
        console.error('No response received from server:', error.request);
        return { error: true, message: 'No response from server. Please try again later.' };
      } else {
        console.error('Unexpected error:', error.message);
        return { error: true, message: `Unexpected error: ${error.message}` };
      }
    }
  }
}
