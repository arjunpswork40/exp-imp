import NorthAmericaService from "../../../../services/Admin/Course/Continent/NorthAmericaService";
const NorthAmericaController = {
  fetchCountryList: async (token) => {
    try {
      const response = await NorthAmericaService.countryList(token);
      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchInstituteDetailsByCountry: async(token,contineny,countryId) => {
    try {
      const response = await NorthAmericaService.instituteListByCountry(token,contineny,countryId);
      return response;
    } catch(error) {
      throw error
    }
  }
};

export default NorthAmericaController;
