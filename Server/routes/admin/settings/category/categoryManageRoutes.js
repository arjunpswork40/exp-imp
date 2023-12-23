const express = require("express");
const router = express.Router();
const { MulterError } = require("multer");

const { getAddCategoryPage, storeCategory } = require('../../../../app/controllers/admin/settings/category/adminCategoryManageController')

const { uploadFilesWithSizeValidationCategory } = require("../../../../utils/fileUploader");
const { isFilesExist } = require("../../../../app/middlewares/fileChecker");
const { validateCategoryInputs, validateCategorySubCategoryData } = require('../../../../app/middlewares/validator/storeCategoryValidator')


const handleMulterError = (err, req, res, next) => {
    let response;
    if (err instanceof MulterError) {
        console.log(['***********************Error if <start>*********************************'])
        console.log(err);
        console.log(['***********************Error if <end>*********************************'])
        let formValidationError = req.session.formValidationError;
        switch (err.code) {
            case "LIMIT_FILE_SIZE":
                console.log(formValidationError);
                req.session.oldFormValues = req.body;
                if (formValidationError) {
                    console.log('asdasd')
                    if (Object.keys(formValidationError).length != 0) {
                        req.session.formValidationError = {};
                        req.session.formValidationError.push({ imageError: 'File size limit exceeded (max 5MB).' });
                    }
                }

                res.redirect('/admin/settings/category/add-category');
                // response = makeJsonResponse(`File size limit exceeded (max 25MB)`, {}, { file: 'File size limit exceeded (max 25MB)' }, 403, false);
                break;
            case "LIMIT_FILE_COUNT":

                req.session.oldFormValues = req.body;
                if (formValidationError == undefined) {
                    if (Object.keys(formValidationError).length != 0) {
                        req.session.formValidationError = {};
                        req.session.formValidationError.push({ imageError: 'Image upload failed.Too many files' });
                    }
                }

                res.redirect('/admin/settings/category/add-category');
                // response = makeJsonResponse(`Too many files`, {}, { file: 'Too many files' }, 403, false);
                break;
            case "LIMIT_PART_COUNT":

                req.session.oldFormValues = req.body;
                if (formValidationError == undefined) {
                    if (Object.keys(formValidationError).length != 0) {
                        req.session.formValidationError = {};
                        req.session.formValidationError.push({ imageError: 'Image upload failed.Too many parts.' });
                    }
                }

                res.redirect('/admin/settings/category/add-category');
                // response = makeJsonResponse(`Too many parts`, {}, { file: 'Too many parts' }, 403, false);
                break;
            case "FILE_TYPE":

                req.session.oldFormValues = req.body;
                if (formValidationError == undefined) {
                    if (Object.keys(formValidationError).length != 0) {
                        req.session.formValidationError = {};
                        req.session.formValidationError.push({ imageError: 'Only image and video files are allowed.' });
                    }
                }

                res.redirect('/admin/settings/category/add-category');
                // response = makeJsonResponse(`Only image and video files are allowed`, {}, { file: 'Only image and video files are allowed' }, 403, false);
                break;
            case "LIMIT_FILE_TYPES":
                req.session.oldFormValues = req.body;
                if (formValidationError == undefined) {
                    if (Object.keys(formValidationError).length != 0) {
                        req.session.formValidationError = {};
                        req.session.formValidationError.push({ imageError: 'Only image files are allowed (png,jpeg and jpg ).' });
                    }
                }

                res.redirect('/admin/settings/category/add-category');
                // response = makeJsonResponse(`Only image and video files are allowed`, {}, { file: 'Only image and video files are allowed' }, 403, false);
                break;
            default:

                req.session.oldFormValues = req.body;
                if (formValidationError == undefined) {
                    if (Object.keys(formValidationError).length != 0) {
                        req.session.formValidationError = {};
                        req.session.formValidationError.push({ imageError: 'Image upload failed.Somthing went wrong.' });
                    }
                }

                res.redirect('/admin/settings/category/add-category');
            // response = makeJsonResponse(`Something went wrong`, {}, { file: 'Something went wrong' }, 403, false);
        }
        // res.status(403).json(response);

    } else {
        let formValidationError = req.session.formValidationError;

        console.log(['***********************Error else <start>*********************************'])
        console.log(err);
        console.log(['***********************Error else <end>*********************************'])
        switch (err.code) {
            case "LIMIT_FILE_SIZE":

                req.session.oldFormValues = req.body;
                if (formValidationError == undefined) {
                    if (Object.keys(formValidationError).length != 0) {
                        req.session.formValidationError = {};
                        req.session.formValidationError.push({ imageError: 'File size limit exceeded (max 5MB).' });
                    }
                }

                res.redirect('/admin/settings/category/add-category');
                // response = makeJsonResponse(`File size limit exceeded (max 25MB)`, {}, { file: 'File size limit exceeded (max 25MB)' }, 403, false);
                // res.status(403).json(response);
                break;
            case "LIMIT_FILE_COUNT":

                req.session.oldFormValues = req.body;
                if (formValidationError == undefined) {
                    if (Object.keys(formValidationError).length != 0) {
                        req.session.formValidationError = {};
                        req.session.formValidationError.push({ imageError: 'Image upload failed.Too many files' });
                    }
                }

                res.redirect('/admin/settings/category/add-category');
                // response = makeJsonResponse(`Too many files`, {}, { file: 'Too many files' }, 403, false);
                // res.status(403).json(response);
                break;
            case "LIMIT_PART_COUNT":

                req.session.oldFormValues = req.body;
                if (formValidationError == undefined) {
                    if (Object.keys(formValidationError).length != 0) {
                        req.session.formValidationError = {};
                    }

                }
                req.session.formValidationError.push({ imageError: 'Image upload failed.Too many parts' });
                res.redirect('/admin/settings/category/add-category');
                // response = makeJsonResponse(`Too many parts`, {}, { file: 'Too many parts' }, 403, false);
                // res.status(403).json(response);
                break;
            case "FILE_TYPE":

                req.session.oldFormValues = req.body;
                if (formValidationError == undefined) {
                    if (Object.keys(formValidationError).length != 0) {
                        req.session.formValidationError = {};
                        req.session.formValidationError.push({ imageError: 'Only image and video files are allowed' });
                    }
                }

                res.redirect('/admin/settings/category/add-category');
                // response = makeJsonResponse(`Only image and video files are allowed`, {}, { file: 'Only image and video files are allowed' }, 403, false);
                // res.status(403).json(response);
                break;
            case "LIMIT_FILE_TYPES":

                req.session.oldFormValues = req.body;
                if (formValidationError == undefined) {
                    if (Object.keys(formValidationError).length != 0) {
                        req.session.formValidationError = {};
                        req.session.formValidationError.push({ imageError: 'Only image files are allowed (png,jpeg and jpg )' });
                    }
                }

                res.redirect('/admin/settings/category/add-category');
                // response = makeJsonResponse(`Only image and video files are allowed`, {}, { file: 'Only image and video files are allowed' }, 403, false);
                // res.status(403).json(response);
                break;
            default:

                req.session.oldFormValues = req.body;
                if (formValidationError == undefined) {
                    if (Object.keys(formValidationError).length != 0) {
                        req.session.formValidationError = {};
                        req.session.formValidationError.push({ imageError: 'Image upload failed' });
                    }
                }

                res.redirect('/admin/settings/category/add-category');
            // response = makeJsonResponse(`Something went wrong`, {}, { file: 'Something went wrong' }, 403, false);
            // res.status(403).json(response);
        }
        next(err);
    }
};

router.get('/add-category', getAddCategoryPage);
router.post("/store-category", uploadFilesWithSizeValidationCategory.fields([
    { name: 'subCategoryImage', maxCount: 1 },
    { name: 'categoryImage', maxCount: 1 }
]), handleMulterError, isFilesExist, validateCategorySubCategoryData, storeCategory);


module.exports = router;
