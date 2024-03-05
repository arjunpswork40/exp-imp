import AfricaService from "../../../../services/Admin/Course/Continent/AfricaService";

const AfricaController = {
  fetchCountryList: async (token) => {
    try {
      const response = await AfricaService.countryList(token);
      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchInstituteDetailsByCountry: async(token,contineny,countryId) => {
    try {
      const response = await AfricaService.instituteListByCountry(token,contineny,countryId);
      return response;
    } catch(error) {
      throw error
    }
  }
};

export default AfricaController;
