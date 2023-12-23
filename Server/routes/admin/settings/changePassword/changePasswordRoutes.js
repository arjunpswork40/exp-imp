const express = require("express");
const router = express.Router();

const { getChangePasswordPage, updatePassowrd } = require('../../../../app/controllers/admin/settings/changePassword/adminChangePasswordController')


router.get('/', getChangePasswordPage);
router.post('/update', updatePassowrd);


module.exports = router;
