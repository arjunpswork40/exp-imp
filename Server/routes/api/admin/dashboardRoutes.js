const express = require("express");
const router = express.Router();
const {
    fetchBasicDashBoardDetails
} = require('../../../app/controllers/api/admin/dashboard/adminDashboardController')
const {tokenVerifier} = require('../../../app/middlewares/auth/tokenVerifier')

/* GET users listing. */

router.get("/",tokenVerifier, fetchBasicDashBoardDetails);


module.exports = router;