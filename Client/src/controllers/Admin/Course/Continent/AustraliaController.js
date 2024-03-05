import AustraliaSerivce from "../../../../services/Admin/Course/Continent/AustraliaService";
const AustraliaController = {
  fetchCountryList: async (token) => {
    try {
      const response = await AustraliaSerivce.countryList(token);
      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchInstituteDetailsByCountry: async(token,contineny,countryId) => {
    try {
      const response = await AustraliaSerivce.instituteListByCountry(token,contineny,countryId);
      return response;
    } catch(error) {
      throw error
    }
  }
};

export default AustraliaController;
