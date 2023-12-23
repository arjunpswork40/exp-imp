const express = require("express");
const router = express.Router();

const { forgotPassword, emailVerification, emailVerificationPage } = require('../../../../app/controllers/admin/auth/forgotPassword/adminForgotPasswordController')


router.post('/', forgotPassword);
router.post('/reset/update-password', emailVerification);
router.get('/reset/:token', emailVerificationPage);



module.exports = router;
