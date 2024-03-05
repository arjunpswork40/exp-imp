import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:4000/api';

const LandingService = {
  countryListByContinent: async (continent) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get-country-by-continent/${continent}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message + '--' + error.name;
    }
  },
  fetchInstituteDetailsByCountryIdAndContinent: async (postData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/get-institute-details`,postData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message + '--' + error.name;
    }
  },
  fetchInstituteDetails: async(continent,instituteId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get-institute-details-by-id/${continent}/${instituteId}`);
      return response.data;
    } catch(error) {
      throw error.response ? error.response.data : error.message + '--' + error.name;
    }
  },
  storeEnquery: async(postData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/store-enquery`,postData);
      return response.data;
    } catch(error) {
      throw error.response ? error.response.data : error.message + '--' + error.name;
    }
  }

};

export default LandingService;
