const User = require("../../../../models/User");
const { makeJsonResponse } = require('../../../../../utils/response')
const { hashPassword } = require('../.././../../../utils/auth');
const { commonValues } = require("../../baseController")

module.exports = {

    getChangePasswordPage: async (req, res, next) => {
        let values = await commonValues(req);
        let breadCrumbs = [
            {
                name: 'Home',
                url: '/admin/dashboard'
            },
            {
                name: 'Settings',
                url: '#'
            },
            {
                name: 'Change Password',
                url: '#'
            },

        ];
        res.render(
            "admin/settings/changePassword/index",
            {
                title: "Admin Change Password",
                layout: "admin/layout/main",
                pageTitle: 'Change Password',
                breadCrumbs: breadCrumbs,
                ...values
            }
        );
    },

    updatePassowrd: async (req, res, next) => {
        try {
            let authUser = req.user;
            if (authUser) {
                let password = req.body.password;
                let rePassword = req.body.rePassword;

                if (password === rePassword) {
                    await User.findOne({ _id: authUser.id }, async (err, user) => {
                        if (err) {
                            console.log(err)
                        }


                        if (!user) {
                            console.log('pp=====--pp')
                            req.flash('error', 'Internal error.');
                            res.redirect('/admin/settings/change-password');
                        }
                        let hashedPassword = await hashPassword(password)
                        user.password = hashedPassword.data.hashedValue;

                        console.log('==========')
                        console.log(user)
                        await user.save((err) => {
                            if (err) {
                                console.log(err);
                            }

                        })

                        req.flash('success', 'Password reset successfuly.');
                        res.redirect('/admin/dashboard');
                    });
                } else {
                    console.log('//********')
                    req.flash('error', 'Passwords does not match.');
                    res.redirect('/admin/settings/change-password');
                }

            } else {
                res.redirect('/admin/settings/change-password');
            }
        } catch (err) {
            console.log(err)
        }
    },
    createAdmin: async (req, res, next) => {
        let httpStatusCode = 500;
        let responseData = {};
        try {
            const newUser = await new User({
                name: 'Super Admin',
                email: 'admin@system.com',
                role: ['super-admin']
            });

            let hashedPassword = await hashPassword('admin@123')

            if (hashedPassword.success) {
                newUser.password = hashedPassword.data.hashedValue;

                let admin = await newUser
                    .save()
                    .then(user => {

                        res.redirect('/admin/login')

                    })
                    .catch(err => {
                        res.redirect('/admin/login')
                    });


            } else {
                return makeJsonResponse(hashedPassword);
            }

        } catch (error) {
            return makeJsonResponse(error);

        }



    },




};
