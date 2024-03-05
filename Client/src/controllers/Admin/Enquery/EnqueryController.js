import EnqueryService from "../../../services/Admin/Enquery/EnqueryService";
const EnqueryController = {

  fetchEnqueryDetailsByInstitute: async (token,continent) => {
    try {
      const response = await EnqueryService.fetchEnqueryDetailsByInstitute(token,continent);
      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchEnqueryDetails: async (token,continent,instituteId) => {
    try {
      const response = await EnqueryService.fetchEnqueryDetails(token,continent,instituteId);
      return response;
    } catch (error) {
      throw error;
    }
  },

};

export default EnqueryController;
