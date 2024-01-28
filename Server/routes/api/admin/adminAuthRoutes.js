const express = require("express");
const router = express.Router();
const {
    login,
    refreshToken
} = require('../../../app/controllers/api/admin/auth/adminAuthController')
const {tokenVerifier} = require('../../../app/middlewares/auth/tokenVerifier')
const { adminLoginValidator } = require('../../../app/middlewares/validator/auth/adminAuthRequestValidator')

/* GET users listing. */

router.post("/login",adminLoginValidator, login);
router.post("/refresh-token", adminLoginValidator, refreshToken);


module.exports = router;