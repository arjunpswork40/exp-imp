const express = require("express");
const router = express.Router();
const { getFeedbacks, filterFeedbacks, changeFeedbackStatus } = require('../../../app/controllers/admin/feedback/adminFeedbackController')

// Authorization middleware
const requireAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/admin/login');
    }
};

/* GET users listing. */

router.get("/", requireAuth, getFeedbacks);

/* POST users listing. */
router.post("/filter", requireAuth, filterFeedbacks);
router.post("/change-status", requireAuth, changeFeedbackStatus);

module.exports = router;
