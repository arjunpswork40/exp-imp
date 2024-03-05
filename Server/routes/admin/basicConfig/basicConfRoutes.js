const express = require("express");
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const {
    createAdmin,
    createCountryEntry
} = require('../../../app/controllers/admin/basicConfig/adminBasicConfigController')


/* GET users listing. */
router.get("/create-admin", createAdmin);
router.get('/countries-insert',createCountryEntry);
module.exports = router;
