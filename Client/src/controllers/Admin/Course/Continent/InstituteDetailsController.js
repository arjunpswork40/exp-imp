import InstituteDetailsService from "../../../../services/Admin/Course/Continent/InstituteDetailsService";

const InstituteDetailsController = {

  storeInstituteDetails: async (token,postData) => {
    try {
      const response = await InstituteDetailsService.storeDetails(token,postData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  fetchInstituteDetailsById: async (token,postData) => {
    try {
      const response = await InstituteDetailsService.fetchDetailsById(token,postData);
      return response;
    } catch (error) {
      throw error;
    }
  },
  removeFileFromDetailsController: async (token,postData) => {
    try {
      const response = await InstituteDetailsService.removeFileFromDetails(token,postData);
      return response;
    } catch (error) {
      throw error;
    }
  },
  updateInstituteDetail: async (token,postData) => {
    try {
      const response = await InstituteDetailsService.updateInstitueDetails(token,postData);
      return response;
    } catch (error) {
      throw error;
    }
  },

};

export default InstituteDetailsController;
