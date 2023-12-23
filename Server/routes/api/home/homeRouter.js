const express = require("express");
const router = express.Router();
const {
    getHomeScreenDetails,
    searchCategory
} = require('../../../app/controllers/api/home/homeController')
const { isApiAuthenticated } = require('../../../app/middlewares/auth/isAuthenticated')


/* GET users listing. */

router.post("/", isApiAuthenticated, getHomeScreenDetails);


router.post("/search-category", isApiAuthenticated, searchCategory);


module.exports = router;