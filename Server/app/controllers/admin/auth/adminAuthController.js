const User = require("../../../models/User");
module.exports = {
    getLoginPage: (req, res, next) => {
        let successMessage = req.flash('success');
        let errorMessage = req.flash('error');
        const csrfToken = req.csrfToken();

        res.render("admin/authentication/login/index", { title: "Admin Login", layout: "admin/authentication/layout/main", successMessage: successMessage, errorMessage: errorMessage, csrfToken: csrfToken });
    },
    logout: (req, res, next) => {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/admin/login');
        });
    }
};
