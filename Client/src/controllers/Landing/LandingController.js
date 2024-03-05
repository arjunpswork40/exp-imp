import LandingService from "../../services/Landing/LandingService";

const LandingController = {
  fetchCountryList: async (continent) => {
    try {
      const response = await LandingService.countryListByContinent(continent);
      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchInstituteDetailsByCountryIdAndContinent: async (postData) => {
    try {
      const response = await LandingService.fetchInstituteDetailsByCountryIdAndContinent(postData);
      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchInstituteDetails: async(continent,instituteId) => {
    try {
      const response = await LandingService.fetchInstituteDetails(continent,instituteId);
      return response;
    } catch(error) {
      throw error;
    }
  },
  storeEnquery: async(postData) => {
    try {
      const response = await LandingService.storeEnquery(postData);
      return response;
    } catch(error) {
      throw error;
    }
  }

};

export default LandingController;
