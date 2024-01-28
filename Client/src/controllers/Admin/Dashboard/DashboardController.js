import DashboardService from "../../../services/Admin/Dashboard/DashboardService";

const DashboardController = {
  fetchDashboardData: async (token) => {
    try {
      const response = await DashboardService.dashboardDetails(token);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default DashboardController;
