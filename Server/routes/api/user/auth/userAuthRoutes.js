const express = require("express");
const router = express.Router();
const {
    login,
} = require('../../../../app/controllers/api/user/auth/userAuthController')

const { register } = require('../../../../app/controllers/api/user/auth/registerUserController')
const { userLoginValidator } = require('../../../../app/middlewares/validator/auth/userAuthRequestValidator')
const { registerUserRequestValidator } = require('../../../../app/middlewares/validator/auth/registerUserRequestValidator')

/* GET users listing. */

router.post("/login", userLoginValidator, login);
router.post("/register", registerUserRequestValidator, register);



module.exports = router;