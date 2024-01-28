const { makeJsonResponse } = require("../../../../../utils/response");
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../../../../models/User');

module.exports = {

    login: async (req, res, next) => {
        const { email, password } = req.body;
        try {

            // Replace with your actual authentication logic (e.g., querying the database)
            User.findOne({ email, password }, (err, user) => {
                if (err || !user) {
                    const response = makeJsonResponse('Unauthorized entry, Please check your email and password', {}, {}, 401, false);
                    return res.status(401).json(response);
                }
            
                const accessToken = jwt.sign({ email: user.email, role: user.roles }, 'your_secret_key');
                const data = {
                    id: user._id,
                    name: user.name,
                    email:user.email,
                    token:accessToken
                }
                const response = makeJsonResponse('User authenticated', data, {}, 200, true);
                return res.status(200).json(response);
            });

            
            
        } catch (error) {
            console.log(error);
            const response = makeJsonResponse('Some error occurred', {}, error, 500, false);
            res.status(500).json(response);
        }

    },
   
}