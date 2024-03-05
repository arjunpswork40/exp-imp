import SouthAmericaService from "../../../../services/Admin/Course/Continent/SouthAmericaService";
const SouthAmerica = {
  fetchCountryList: async (token) => {
    try {
      const response = await SouthAmericaService.countryList(token);
      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchInstituteDetailsByCountry: async(token,contineny,countryId) => {
    try {
      const response = await SouthAmericaService.instituteListByCountry(token,contineny,countryId);
      return response;
    } catch(error) {
      throw error
    }
  }
};

export default SouthAmerica;
