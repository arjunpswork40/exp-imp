const { makeJsonResponse } = require("../../../../utils/response");
const AppDetail = require("../../../models/AppDetail");
const User = require("../../../models/User");
const { commonValues } = require("../baseController")


module.exports = {

    getPrivacyPolicy: async (req, res, next) => {

        let appData = await AppDetail.findOne();
        let values = await commonValues(req);

        let breadCrumbs = [
            {
                name: 'Home',
                url: '/admin/dashboard'
            },
            {
                name: 'Privacy Policy',
                url: '#'
            },

        ];
        res.render(
            "admin/privacyPolicy/index",
            {
                title: "Privacy Policy",
                layout: "admin/layout/main",
                privacyPolicyEN: appData ? appData.privacy_policy_en : '',
                privacyPolicyML: appData ? appData.privacy_policy_ml : '',
                appDetailsId: appData ? appData._id : '',
                pageTitle: 'Privacy Policy',
                breadCrumbs: breadCrumbs,
                ...values
            }
        );

    },
    updatePrivacyPolicy: async (req, res, next) => {
        let id = req.body.updateId;
        let privacyPolicyEN = req.body.updateDataEN;
        let privacyPolicyML = req.body.updateDataML;
        try {
            let updatedValue;
            if (id) {
                updatedValue = await AppDetail.findByIdAndUpdate(id, { privacy_policy_en: privacyPolicyEN, privacy_policy_ml: privacyPolicyML }, { new: true });
            } else {
                updatedValue = await AppDetail.create({ privacy_policy_en: privacyPolicyEN, privacy_policy_ml: privacyPolicyML });
            }

            let response = makeJsonResponse(`Privacy Policy updated successfully.`, updatedValue, {}, 200, true);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            let response = makeJsonResponse("Some error occurred.", {}, error, 500, false);
            res.status(200).json(response);
        }
    },

    getTermsAndConditions: async (req, res, next) => {

        let appData = await AppDetail.findOne();
        let values = await commonValues(req);
        let breadCrumbs = [
            {
                name: 'Home',
                url: '/admin/dashboard'
            },
            {
                name: 'Terms And Conditions',
                url: '#'
            },

        ];
        res.render(
            "admin/termsAndConditions/index",
            {
                title: "Terms and Conditions",
                layout: "admin/layout/main",
                termsAndConditionsEN: appData ? appData.terms_and_conditions_en : '',
                termsAndConditionsML: appData ? appData.terms_and_conditions_ml : '',
                appDetailsId: appData ? appData._id : '',
                pageTitle: 'Terms and Conditions',
                breadCrumbs: breadCrumbs,
                ...values
            }
        );

    },
    updateTermsAndConditions: async (req, res, next) => {
        let id = req.body.updateId;
        let termsAndConditionsEN = req.body.updateDataEN;
        let termsAndConditionsML = req.body.updateDataML;

        try {
            let updatedValue;
            if (id) {
                updatedValue = await AppDetail.findByIdAndUpdate(id, { terms_and_conditions_en: termsAndConditionsEN, terms_and_conditions_ml: termsAndConditionsML }, { new: true });
            } else {
                updatedValue = await AppDetail.create({ terms_and_conditions_en: termsAndConditionsEN, terms_and_conditions_ml: termsAndConditionsML });
            }

            let response = makeJsonResponse(`Terms and Conditions updated successfuly.`, updatedValue, {}, 200, true);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            let response = makeJsonResponse("Some error occurred.", {}, error, 500, false);
            res.status(500).json(response);
        }

    },
    getContactUs: async (req, res, next) => {

        let appData = await AppDetail.findOne();
        let values = await commonValues(req);
        let breadCrumbs = [
            {
                name: 'Home',
                url: '/admin/dashboard'
            },
            {
                name: 'Contact Us',
                url: '#'
            },

        ];
        res.render(
            "admin/contactUs/index",
            {
                title: "Contact us",
                layout: "admin/layout/main",
                contactUs: appData ? appData : '',
                appDetailsId: appData ? appData._id : '',
                pageTitle: 'Contact us',
                breadCrumbs: breadCrumbs,
                ...values
            }
        );

    },

    updateContactUs: async (req, res, next) => {
        let id = req.body.appDetailsId;
        let whatsapp_number = req.body.whatsapp;
        let digital_visiting_card = req.body.digital_visiting_card;
        let instagaram_link = req.body.instagaram_link;
        let facebook_link = req.body.facebook_link;
        let twiter_link = req.body.twiter_link;
        let address = req.body.address;
        let email = req.body.email;

        try {
            let updatedValue;
            if (id) {
                updatedValue = await AppDetail.findByIdAndUpdate(id, {
                    whatsapp_number: whatsapp_number,
                    digital_visiting_card: digital_visiting_card,
                    instagaram_link: instagaram_link,
                    facebook_link: facebook_link,
                    twiter_link: twiter_link,
                    address: address,
                    email: email,
                }, { new: true });
            } else {
                updatedValue = await AppDetail.create({
                    whatsapp_number: whatsapp_number,
                    digital_visiting_card: digital_visiting_card,
                    instagaram_link: instagaram_link,
                    facebook_link: facebook_link,
                    twiter_link: twiter_link,
                    address: address,
                    email: email,
                });
            }

            req.flash('success', 'Contact Us updated');
            res.redirect('/admin/app-details/contact-us')

        } catch (error) {
            console.log(error);
            req.flash('error', 'Some error cooured.');
            res.redirect('/admin/app-details/contact-us')
        }

    },
}
