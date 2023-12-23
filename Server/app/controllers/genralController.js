module.exports = {

    getPrivacyPolicy: async (req, res, next) => {
        const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
        res.render("general/privacy-policy/index", {
            title: "Privacy Policy", layout: "layout/main", baseUrl: baseUrl
        });

    },

    getTermsAndConditions: async (req, res, next) => {
        const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
        res.render("general/terms-and-conditions/index", { title: "Terms And Conditions", layout: "layout/main", baseUrl: baseUrl });

    },




};
