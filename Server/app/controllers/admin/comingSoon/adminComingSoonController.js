const User = require("../../../models/User");
const { commonValues } = require("../baseController")
module.exports = {

    getCominSoonPAge: async (req, res, next) => {

        let values = await commonValues(req);
        res.render("admin/comingSoon/index", { title: "Coming-Soon", layout: "admin/layout/main", pageTitle: 'Coming-Soon', ...values });

    },




};
