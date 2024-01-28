import AuthService from '../../../services/Admin/Auth/AuthServices';

const AuthController = {
  login: async (admin) => {
    try {
      const response = await AuthService.login(admin);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthController;
