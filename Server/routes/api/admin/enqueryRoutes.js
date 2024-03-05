const express = require("express");
const router = express.Router();

const {tokenVerifier} = require('../../../app/middlewares/auth/tokenVerifier')
const {educationalInstituteStoreValidator,educationalInstituteUpdateValidator} = require('../../../app/middlewares/validator/educationalInstituteValidator')
const {
    getEnqueriesUnderInstitute,
    getEnqueryDetails
} = require('../../../app/controllers/api/admin/enquery/enqueryController')

/* GET users listing. */

router.get("/:continent", tokenVerifier, getEnqueriesUnderInstitute);
router.get("/details/:continent/:instituteId", tokenVerifier, getEnqueryDetails);

module.exports = router;