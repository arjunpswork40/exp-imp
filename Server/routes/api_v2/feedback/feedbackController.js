const express = require("express");
const router = express.Router();
const {
    storeFeedback,
    getAllFeedBacks
} = require('../../../app/controllers/api_v2/feedback/feedbackController')

const { validateFeedback } = require('../../../app/middlewares/requestValidator')
const { isApiAuthenticated } = require('../../../app/middlewares/auth/isAuthenticated')


/* GET users listing. */

// router.post("/store", validateFeedback, storeFeedback);
router.post("/store", isApiAuthenticated, validateFeedback, storeFeedback);
router.post("/list", isApiAuthenticated, getAllFeedBacks);



module.exports = router;
