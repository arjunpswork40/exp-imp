const express = require("express");
const router = express.Router();
const {
    getCountriesInAfrica,
    getCountriesInAsia,
    getCountriesInAustralia,
    getCountriesInEurope,
    getCountriesInNorthAmerica,
    getCountriesInSouthAmerica
} = require('../../../app/controllers/api/admin/continents/continentsController')
const {tokenVerifier} = require('../../../app/middlewares/auth/tokenVerifier')

/* GET users listing. */

router.get("/Africa/countries",tokenVerifier, getCountriesInAfrica);
router.get("/Asia/countries",tokenVerifier, getCountriesInAsia);
router.get("/Australia/countries",tokenVerifier, getCountriesInAustralia);
router.get("/Europe/countries",tokenVerifier, getCountriesInEurope);
router.get("/NorthAmerica/countries",tokenVerifier, getCountriesInNorthAmerica);
router.get("/SouthAmerica/countries",tokenVerifier, getCountriesInSouthAmerica);



module.exports = router;