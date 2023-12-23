const express = require("express");
const router = express.Router();
const { getCominSoonPAge } = require('../../../app/controllers/admin/comingSoon/adminComingSoonController')

// Authorization middleware
const requireAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/admin/login');
    }
};

/* GET users listing. */

router.get("/", requireAuth, getCominSoonPAge);


module.exports = router;
