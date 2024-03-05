import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:4000/api';

const InstituteDetailsService = {
  storeDetails: async (token,postData) => {
    console.log('pppp=>',postData)
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/continents/store-educational-institutes`, postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token // Pass the token in the Authorization header
        },
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message + '--' + error.name;
    }
  },
  fetchDetailsById: async (token,postData) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/continents/${postData.continent}/${postData.instituteId}/institute-detail`, {
        headers: {
          Authorization: token // Pass the token in the Authorization header
        },
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message + '--' + error.name;
    }
  },
  updateInstitueDetails: async (token,postData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/continents/institute-detail-update`,postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token // Pass the token in the Authorization header
        },
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message + '--' + error.name;
    }
  },
  removeFileFromDetails: async (token,postData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/continents/institute-detail-remove-file`,postData, {
        headers: {
          Authorization: token // Pass the token in the Authorization header
        },
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message + '--' + error.name;
    }
  },
};

export default InstituteDetailsService;
