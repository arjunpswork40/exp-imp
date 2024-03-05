const express = require("express");
const router = express.Router();
const {
    getCountriesInAfrica,
    getCountriesInAsia,
    getCountriesInAustralia,
    getCountriesInEurope,
    getCountriesInNorthAmerica,
    getCountriesInSouthAmerica,
    storeEducationalInstitutes,
    fetchInstituteListByCountryId,
    fetchInstituteDetailById,
    updateInstituteDetails,
    removeFile
} = require('../../../app/controllers/api/admin/continents/continentsController')
const {tokenVerifier} = require('../../../app/middlewares/auth/tokenVerifier')
const {educationalInstituteStoreValidator,educationalInstituteUpdateValidator} = require('../../../app/middlewares/validator/educationalInstituteValidator')
const {educationalInstitueFileRemoveRequestValidator} = require('../../../app/middlewares/validator/educationalInstitueFileRemoveRequestValidator')
const { MulterError } = require("multer");
const { uploadMultipleFiles,uploadSingleFile,docUpload,uploadSingleFileWithSizeValidation } = require('../../../utils/fileUploader')
const { makeJsonResponse } = require("../../../utils/response");

const handleMulterError = (err, req, res, next) => {
    let response;
    console.log(err)

    if (err instanceof MulterError) {
        console.log(err)
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

/* GET users listing. */

router.get("/Africa/countries",tokenVerifier, getCountriesInAfrica);
router.get("/Asia/countries",tokenVerifier, getCountriesInAsia);
router.get("/Australia/countries",tokenVerifier, getCountriesInAustralia);
router.get("/Europe/countries",tokenVerifier, getCountriesInEurope);
router.get("/NorthAmerica/countries",tokenVerifier, getCountriesInNorthAmerica);
router.get("/SouthAmerica/countries",tokenVerifier, getCountriesInSouthAmerica);
router.get("/:continent/:countryId/institute-list",tokenVerifier, fetchInstituteListByCountryId);
router.get("/:continent/:instituteId/institute-detail",tokenVerifier, fetchInstituteDetailById);


// const cpUpload = uploadMultipleFiles.fields([{ name: 'relatedDocuments' }, { name: 'relatedVideos'}, { name: 'relatedImages'}])





router.post(
    "/store-educational-institutes",
    tokenVerifier, 
    [docUpload.fields([
        { name: 'titleImage',maxCount:1},
        { name: 'relatedDocuments[]',maxCount:20 },
        { name: 'relatedVideos[]',maxCount:20}, 
        { name: 'relatedImages[]',maxCount:20},
    ])],
    handleMulterError,
    educationalInstituteStoreValidator, 
    storeEducationalInstitutes);

router.post("/institute-detail-update",
    tokenVerifier, 
    [docUpload.fields([
        { name: 'titleImage',maxCount:1},
        { name: 'relatedDocuments[]',maxCount:20 },
        { name: 'relatedVideos[]',maxCount:20}, 
        { name: 'relatedImages[]',maxCount:20},
    ])],
    educationalInstituteUpdateValidator, 
    updateInstituteDetails);

router.post("/institute-detail-remove-file",tokenVerifier, educationalInstitueFileRemoveRequestValidator,removeFile);


module.exports = router;