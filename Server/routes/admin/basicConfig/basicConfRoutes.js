const express = require("express");
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const {
    createAdmin,
    insertBulkTestDataToDB,
    insertDataToCategoryAndSubCategory,
    oneTimeProcessForDataTypeAndNameInsertionOnCategory,
    createCountryEntry
} = require('../../../app/controllers/admin/basicConfig/adminBasicConfigController')


/* GET users listing. */
router.get("/create-admin", createAdmin);
router.get("/insert-bulk-data-to-db", insertBulkTestDataToDB);
router.get("/insert-bulk-data-to-category-subcategory", insertDataToCategoryAndSubCategory);
router.get('/add-data-field-and-name-to-category', oneTimeProcessForDataTypeAndNameInsertionOnCategory);
router.get('/countries-insert',createCountryEntry);
module.exports = router;
