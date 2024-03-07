const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../../../../models/Admin');
const Token = require('../../../../models/Token'); // Adjust the path accordingly
const { makeJsonResponse } = require("../../../../../utils/response");
const auth = require('../../../../../utils/auth')
const login = async (req, res, next) => {
  const { email, password } = req.body;
    const secretKey = process.env.SECRET_KEY_JWT;
    const refreshTokens = [];
  try {
    // Replace with your actual authentication logic (e.g., querying the database)
    Admin.findOne({ email }, async (err, admin) => {
      if (err || !admin) {
        const response = makeJsonResponse('Unauthorized entry. Please check your email and password.', {}, {}, 401, false);
        return res.status(401).json(response);
      }

      // Use the isValidPassword method to compare passwords
      const isValidPassword = await admin.isValidPassword(password);


      if (!isValidPassword) {
        const response = makeJsonResponse('Unauthorized entry. Please check your email and password.', {}, {}, 401, false);
        return res.status(401).json(response);
      }

      // Password is valid, generate an access token
      const accessToken = jwt.sign({ email: admin.email, roles: admin.roles }, secretKey, { expiresIn: '50m' });

      const existingToken = await Token.findOne({
        userId: admin._id,
        from:'admin'
      })

      const storableToken = await auth.createStorableToken(accessToken);

      const tokenData = {
        token: storableToken,
        from: 'admin',
        userId: admin._id
      }
      await Token.findOneAndUpdate({
                    userId: admin._id,
                    from:'admin'
                  },
                  tokenData,
                  { upsert: true, new: true }
                )

      const data = {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        accessToken: storableToken,
        tokenStatus: true
      };

      const response = makeJsonResponse('Admin authenticated', data, {}, 200, true);
      return res.status(200).json(response);
    });
  } catch (error) {
    console.error(error);
    const response = makeJsonResponse('Some error occurred', {}, error, 500, false);
    return res.status(500).json(response);
  }
};
const refreshToken = async (req, res, next) => {
    const { refreshToken } = req.body;

    // Check if the refresh token is valid
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        const response = makeJsonResponse('Invalid refresh token', {}, {}, 403, false);
        return res.status(403).json(response);
    }

    // Verify the refresh token and generate a new access token
    jwt.verify(refreshToken, secretKey, (err, user) => {
      if (err) {
        const response = makeJsonResponse('Invalid refresh token', {}, {}, 403, false);
        return res.status(403).json(response);
      }

      const newAccessToken = jwt.sign({ username: user.username }, secretKey, { expiresIn: '15m' });
      const response = makeJsonResponse('Refresh token created successfuly', { accessToken: newAccessToken }, {}, 200, true);
      return res.status(200).json(response);
    });
}

module.exports = { login, refreshToken };