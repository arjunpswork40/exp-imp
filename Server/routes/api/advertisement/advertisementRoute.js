const express = require("express");
const router = express.Router();
const { MulterError } = require("multer");
const { makeJsonResponse } = require("../../../utils/response");
const {
    storeAdvertisement,
} = require('../../../app/controllers/api/advertisement/advertisementController')
const { uploadSingleFileWithSizeValidation } = require("../../../utils/fileUploader");
const { isFileExist } = require("../../../app/middlewares/fileChecker");
const { validateAdvertisementInputs } = require('../../../app/middlewares/validator/advertisementValidator')
const { isApiAuthenticated } = require('../../../app/middlewares/auth/isAuthenticated')

/* GET users listing. */

const handleMulterError = (err, req, res, next) => {
    let response;
    if (err instanceof MulterError) {
        switch (err.code) {
            case "LIMIT_FILE_SIZE":
                response = makeJsonResponse(`File size limit exceeded (max 25MB)`, {}, { file: 'File size limit exceeded (max 25MB)' }, 403, false);
                break;
            case "LIMIT_FILE_COUNT":
                response = makeJsonResponse(`Too many files`, {}, { file: 'Too many files' }, 403, false);
                break;
            case "LIMIT_PART_COUNT":
                response = makeJsonResponse(`Too many parts`, {}, { file: 'Too many parts' }, 403, false);
                break;
            case "FILE_TYPE":
                response = makeJsonResponse(`Only image and video files are allowed`, {}, { file: 'Only image and video files are allowed' }, 403, false);
                break;
            case "LIMIT_FILE_TYPES":
                response = makeJsonResponse(`Only image and video files are allowed`, {}, { file: 'Only image and video files are allowed' }, 403, false);
                break;
            default:
                response = makeJsonResponse(`Something went wrong`, {}, { file: 'Something went wrong' }, 403, false);
        }
        res.status(403).json(response);

    } else {
        console.log(err)
        switch (err.code) {
            case "LIMIT_FILE_SIZE":
                response = makeJsonResponse(`File size limit exceeded (max 25MB)`, {}, { file: 'File size limit exceeded (max 25MB)' }, 403, false);
                res.status(403).json(response);
                break;
            case "LIMIT_FILE_COUNT":
                response = makeJsonResponse(`Too many files`, {}, { file: 'Too many files' }, 403, false);
                res.status(403).json(response);
                break;
            case "LIMIT_PART_COUNT":
                response = makeJsonResponse(`Too many parts`, {}, { file: 'Too many parts' }, 403, false);
                res.status(403).json(response);
                break;
            case "FILE_TYPE":
                response = makeJsonResponse(`Only image and video files are allowed`, {}, { file: 'Only image and video files are allowed' }, 403, false);
                res.status(403).json(response);
                break;
            case "LIMIT_FILE_TYPES":
                response = makeJsonResponse(`Only image and video files are allowed`, {}, { file: 'Only image and video files are allowed' }, 403, false);
                res.status(403).json(response);
                break;
            default:
                response = makeJsonResponse(`Something went wrong`, {}, { file: 'Something went wrong' }, 403, false);
                res.status(403).json(response);
        }
        next(err);
    }
};

router.post("/store", isApiAuthenticated, [uploadSingleFileWithSizeValidation.single("file"), isFileExist], handleMulterError, validateAdvertisementInputs, storeAdvertisement);


module.exports = router;
