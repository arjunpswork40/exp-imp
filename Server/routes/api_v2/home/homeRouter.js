const express = require("express");
const router = express.Router();
const {
    getHomeScreenDetails,
    searchCategory,
    getCategory,
    getSubCategory
} = require('../../../app/controllers/api_v2/home/homeController')
const { isApiAuthenticated } = require('../../../app/middlewares/auth/isAuthenticated')


/* GET users listing. */

router.post("/", isApiAuthenticated, getHomeScreenDetails);


router.post("/search-category", isApiAuthenticated, searchCategory);
router.post("/get-category", isApiAuthenticated, getCategory);
router.post("/get-sub-category", isApiAuthenticated, getSubCategory);



module.exports = router;
