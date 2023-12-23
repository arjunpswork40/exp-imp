const express = require("express");
const router = express.Router();
const {
    getAppDetails,
} = require('../../../app/controllers/api_v2/appDetails/appDetailsController')
const { isApiAuthenticated } = require('../../../app/middlewares/auth/isAuthenticated')



/* GET users listing. */

router.get("/", isApiAuthenticated, getAppDetails);

module.exports = router;
