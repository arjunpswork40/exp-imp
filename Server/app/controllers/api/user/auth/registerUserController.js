const { makeJsonResponse } = require("../../../../../utils/response");
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../../../../models/User');

module.exports = {

    register: async (req, res, next) => {
        const { email, password, mobileNumber, name } = req.body;
        try {

            const user = await User.findOne({
                $or: [
                  { email: email },
                  { mobileNumber: mobileNumber },
                ],
              });
            if(!user) {

                const newUser = new User({
                    name: name,
                    email: email,
                    password: password,
                    mobileNumber: mobileNumber
                })

                await newUser.save((error) => {
                    if(error){
                        console.log(error)
                        const response = makeJsonResponse(`User data not stored. Some error occuured.`, {}, error, 500, false, {});
                        return res.status(500).json(response);
                    } else {
                        const response = makeJsonResponse(`User Registered Successfuly.`, newUser, {}, 200, true, {});
                        return res.status(200).json(response);
                    }
                })
              } else {
                const response = makeJsonResponse('User already exist.', user, {}, 200, true);
                return res.status(200).json(response);
              }
            

            
            
        } catch (error) {
            console.log(error);
            const response = makeJsonResponse('Some error occurred', {}, error, 500, false);
            res.status(500).json(response);
        }

    },
   
}