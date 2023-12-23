const express = require("express");
const router = express.Router();
const {
    getCategoryPage,
    getSubCategoryPage,
    storeSubCategoryData,
    storeSubCategory,
    storeCategoryData,
    getCategoryDataForEdit,
    updateCategoryData,
    deleteCategoryData,
    deleteSubCategoryData,
    editSubCategory,
    deleteSubCategory,
    getSubCategoryDataForEdit,
    updateSubCategoryData,
    changeRecommendStatus,
    deleteCategory,
    addDataFieldsToCategory,
    editCategory,
    getImageGalleryPage,
    deleteImageFromAlbum
} = require('../../../app/controllers/admin/category/adminCategoryController')
const categories = require('../../../utils/category')
const { uploadFilesWithSizeValidationCategory, categorySubCategoryImageUpload } = require("../../../utils/fileUploader");
const { isFilesExist } = require("../../../app/middlewares/fileChecker");
const { MulterError } = require("multer");


const handleMulterError = (err, req, res, next) => {
    console.log('sdsdsd')
    let response;
    if (err instanceof MulterError) {
        console.log(['***********************Error if <start>*********************************'])
        console.log(err);
        console.log(['***********************Error if <end>*********************************'])
        switch (err.code) {
            case "LIMIT_FILE_SIZE":

                // req.session.oldFormValues = req.body;
                // (req.session.formValidationError == undefined) ? req.session.formValidationError = {} : {}
                // req.session.formValidationError.push({ imageError: 'File size limit exceeded (max 5MB).' });
                req.flash('error', 'File upload failed');
                res.redirect('/admin/dashboard');
                // response = makeJsonResponse(`File size limit exceeded (max 25MB)`, {}, { file: 'File size limit exceeded (max 25MB)' }, 403, false);
                break;
            case "LIMIT_FILE_COUNT":

                // req.session.oldFormValues = req.body;
                // (req.session.formValidationError == undefined) ? req.session.formValidationError = {} : {}
                // req.session.formValidationError.push({ imageError: 'Image upload failed.Too many files' });
                req.flash('error', 'File upload failed');
                res.redirect('/admin/dashboard');
                // response = makeJsonResponse(`Too many files`, {}, { file: 'Too many files' }, 403, false);
                break;
            case "LIMIT_PART_COUNT":

                // req.session.oldFormValues = req.body;
                // (req.session.formValidationError == undefined) ? req.session.formValidationError = {} : {}
                // req.session.formValidationError.push({ imageError: 'Image upload failed.Too many parts.' });
                req.flash('error', 'File upload failed');
                res.redirect('/admin/dashboard');
                // response = makeJsonResponse(`Too many parts`, {}, { file: 'Too many parts' }, 403, false);
                break;
            case "FILE_TYPE":

                // req.session.oldFormValues = req.body;
                // (req.session.formValidationError == undefined) ? req.session.formValidationError = {} : {}
                // req.session.formValidationError.push({ imageError: 'Only image and video files are allowed.' });
                req.flash('error', 'File upload failed');
                res.redirect('/admin/dashboard');
                // response = makeJsonResponse(`Only image and video files are allowed`, {}, { file: 'Only image and video files are allowed' }, 403, false);
                break;
            case "LIMIT_FILE_TYPES":
                // req.session.oldFormValues = req.body;
                // (req.session.formValidationError == undefined) ? req.session.formValidationError = {} : {}
                // req.session.formValidationError.push({ imageError: 'Only image files are allowed (png,jpeg and jpg ).' });
                req.flash('error', 'File upload failed');
                res.redirect('/admin/dashboard');
                // response = makeJsonResponse(`Only image and video files are allowed`, {}, { file: 'Only image and video files are allowed' }, 403, false);
                break;
            case 'ENOENT':
                req.flash('error', 'File upload failed');
                res.redirect('/admin/dashboard');
                break;
            default:

                // req.session.oldFormValues = req.body;
                // (req.session.formValidationError == undefined) ? req.session.formValidationError = {} : {}
                // req.session.formValidationError.push({ imageError: 'Image upload failed.Somthing went wrong.' });
                req.flash('error', 'File upload failed');
                res.redirect('/admin/dashboard');
            // response = makeJsonResponse(`Something went wrong`, {}, { file: 'Something went wrong' }, 403, false);
        }
        // res.status(403).json(response);

    } else {

        console.log(['***********************Error else <start>*********************************'])
        console.log(err);
        console.log(['***********************Error else <end>*********************************'])
        switch (err.code) {
            case "LIMIT_FILE_SIZE":

                // req.session.oldFormValues = req.body;
                // (req.session.formValidationError == undefined) ? req.session.formValidationError = {} : {}
                // req.session.formValidationError.push({ imageError: 'File size limit exceeded (max 5MB).' });
                req.flash('error', 'File upload failed');
                res.redirect('/admin/dashboard');
                // response = makeJsonResponse(`File size limit exceeded (max 25MB)`, {}, { file: 'File size limit exceeded (max 25MB)' }, 403, false);
                // res.status(403).json(response);
                break;
            case 'ENOENT':
                req.flash('error', 'File upload failed');
                res.redirect('/admin/dashboard');
                break;
            case "LIMIT_FILE_COUNT":

                // req.session.oldFormValues = req.body;
                // (req.session.formValidationError == undefined) ? req.session.formValidationError = {} : {}
                // req.session.formValidationError.push({ imageError: 'Image upload failed.Too many files' });
                req.flash('error', 'File upload failed');
                res.redirect('/admin/dashboard');
                // response = makeJsonResponse(`Too many files`, {}, { file: 'Too many files' }, 403, false);
                // res.status(403).json(response);
                break;
            case "LIMIT_PART_COUNT":

                // req.session.oldFormValues = req.body;
                // (req.session.formValidationError == undefined) ? req.session.formValidationError = {} : {}
                // req.session.formValidationError.push({ imageError: 'Image upload failed.Too many parts' });
                req.flash('error', 'File upload failed');
                res.redirect('/admin/dashboard');
                // response = makeJsonResponse(`Too many parts`, {}, { file: 'Too many parts' }, 403, false);
                // res.status(403).json(response);
                break;
            case "FILE_TYPE":

                // req.session.oldFormValues = req.body;
                // (req.session.formValidationError == undefined) ? req.session.formValidationError = {} : {}
                // req.session.formValidationError.push({ imageError: 'Only image and video files are allowed' });
                req.flash('error', 'File upload failed');
                res.redirect('/admin/dashboard');
                // response = makeJsonResponse(`Only image and video files are allowed`, {}, { file: 'Only image and video files are allowed' }, 403, false);
                // res.status(403).json(response);
                break;
            case "LIMIT_FILE_TYPES":

                // req.session.oldFormValues = req.body;
                // (req.session.formValidationError == undefined) ? req.session.formValidationError = {} : {}
                // req.session.formValidationError.push({ imageError: 'Only image files are allowed (png,jpeg and jpg )' });
                req.flash('error', 'File upload failed');
                res.redirect('/admin/dashboard');
                // response = makeJsonResponse(`Only image and video files are allowed`, {}, { file: 'Only image and video files are allowed' }, 403, false);
                // res.status(403).json(response);
                break;
            default:

                // req.session.oldFormValues = req.body;
                // (req.session.formValidationError == undefined) ? req.session.formValidationError = {} : {}
                // req.session.formValidationError.push({ imageError: 'Image upload failed' });
                req.flash('error', 'File upload failed');
                res.redirect('/admin/dashboard');
            // response = makeJsonResponse(`Something went wrong`, {}, { file: 'Something went wrong' }, 403, false);
            // res.status(403).json(response);
        }
        next(err);
    }
};



router.get('/:category', getCategoryPage)
router.get('/:category/:subcategory', getSubCategoryPage)
router.post('/recommend-status-change', changeRecommendStatus)
router.post('/delete-category', deleteCategory)
router.post('/add-data-fields-to-category', addDataFieldsToCategory)

router.post('/store-subcategory-data', categorySubCategoryImageUpload.fields([
    { name: 'image' },
]), storeSubCategoryData);
router.post('/store-subcategory', uploadFilesWithSizeValidationCategory.fields([
    { name: 'subCategoryImage', maxCount: 1 },
]), handleMulterError, isFilesExist, storeSubCategory);
router.post('/store-category-data', categorySubCategoryImageUpload.fields([
    { name: 'image' },
]), storeCategoryData);
router.post('/get-category-data-for-edit', getCategoryDataForEdit);
router.post('/update-category-data', categorySubCategoryImageUpload.fields([
    { name: 'image' },
]), updateCategoryData);
router.post('/delete-category-data', deleteCategoryData);
router.post('/delete-subcategory', deleteSubCategory);
router.post('/edit-subcategory', uploadFilesWithSizeValidationCategory.fields([
    { name: 'subCategoryImage', maxCount: 1 },
]), handleMulterError, editSubCategory);
router.post('/delete-subcategory-data', deleteSubCategoryData);
router.post('/get-subcategory-data-for-edit', getSubCategoryDataForEdit);
router.post('/edit-subcategory-data', categorySubCategoryImageUpload.fields([
    { name: 'image' },
]), updateSubCategoryData);

router.post('/edit-category', uploadFilesWithSizeValidationCategory.fields([
    { name: 'categoryImage', maxCount: 1 },
]), editCategory);

router.get('/details/images/album/:type/:id/:data_id', getImageGalleryPage)
router.get('/details/images/album/delete-image/:type/:id/:data_id/:field_name/:image_entry', deleteImageFromAlbum)

module.exports = router;
