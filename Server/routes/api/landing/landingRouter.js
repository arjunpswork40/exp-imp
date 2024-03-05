const express = require("express");
const router = express.Router();

const { 
    getInstitutesInAfrica,
    getCountryByContitnet,
    fetchInstituteDetailsByCountryIdAndContinent,
    getInstituteDetails,
    storeEnquery
 } = require('../../../app/controllers/api/landing/landingController')

 const {enqueryStoreRequestValidator} = require('../../../app/middlewares/validator/enqueryStoreRequestValidator')

/* GET users listing. */

router.post("/Africa/institutes", getInstitutesInAfrica);
router.post("/get-institute-details",fetchInstituteDetailsByCountryIdAndContinent)
router.post("/store-enquery",enqueryStoreRequestValidator,storeEnquery)

router.get("/get-country-by-continent/:continent",getCountryByContitnet)
router.get("/get-institute-details-by-id/:continent/:instituteId",getInstituteDetails)





module.exports = router;