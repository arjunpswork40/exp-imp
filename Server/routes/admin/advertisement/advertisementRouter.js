const express = require("express");
const router = express.Router();
const {
    getAdvertisement,
    viewAdvertisement,
    changePaymentStatus,
    filterAdvertisement,
    deleteAdvertisement
} = require('../../../app/controllers/admin/advertisement/advertisementController')

const { validateAdvertisementDelete } = require('../../../app/middlewares/validator/advertisementValidator')


/* GET users listing. */

router.get("/", getAdvertisement);
router.get("/view/:id", viewAdvertisement);

/* POST users listing. */
router.post("/view/change-payment-status", changePaymentStatus);
router.post("/filter-by-status", filterAdvertisement);
router.post("/delete", validateAdvertisementDelete, deleteAdvertisement);


module.exports = router;
