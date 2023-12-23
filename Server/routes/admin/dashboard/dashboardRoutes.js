const express = require("express");
const router = express.Router();
const { dashboard } = require('../../../app/controllers/admin/dashboard/adminDashboardController')

// Authorization middleware
const requireAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/admin/login');
    }
};

/* GET users listing. */

router.get("/", requireAuth, dashboard);


module.exports = router;
