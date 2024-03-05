import EuropeService from "../../../../services/Admin/Course/Continent/EuropeService";
const EuropeController = {
  fetchCountryList: async (token) => {
    try {
      const response = await EuropeService.countryList(token);
      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchInstituteDetailsByCountry: async(token,contineny,countryId) => {
    try {
      const response = await EuropeService.instituteListByCountry(token,contineny,countryId);
      return response;
    } catch(error) {
      throw error
    }
  }
};

export default EuropeController;
