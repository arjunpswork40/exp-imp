const express = require("express");
const router = express.Router();
const {
    getPrivacyPolicy,
    updatePrivacyPolicy,
    getTermsAndConditions,
    updateTermsAndConditions,
    getContactUs,
    updateContactUs
} = require('../../../app/controllers/admin/appDetail/adminAppDetailsController')



/* GET users listing. */

router.get("/privacy-policy", getPrivacyPolicy);
router.post("/privacy-policy-update", updatePrivacyPolicy);

router.get("/terms-and-conditions", getTermsAndConditions);
router.post("/terms-and-conditions-update", updateTermsAndConditions);

router.get("/contact-us", getContactUs);
router.post("/contact-us-update", updateContactUs);

module.exports = router;
