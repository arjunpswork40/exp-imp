const { makeJsonResponse } = require("../../../utils/response");
const { body, validationResult } = require('express-validator');
const validator = require('validator');

const validateCategoryInputs = [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    body('comment').isLength({ min: 5 }).withMessage('Comment must be atleast 5 characters'),
    body('mobile_number')
        .notEmpty().withMessage('Mobile number is required')
        .custom((value) => {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Invalid mobile number');
            }
            // Return true if validation succeeds
            return true;
        }),
    (req, res, next) => {
        console.log(req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            response = makeJsonResponse(`Validation error.`, {}, errors.array(), 400, false);
            return res.status(400).json(response);
        }
        next();
    }
];





module.exports = {
    validateCategorySubCategoryData: (req, res, next) => {
        let error = [];

        let data = req.body;

        if (data) {

            let categoryName = data.categoryName;
            let haveData = data.haveData;
            let categoryField1 = data.categoryField1;
            let categoryValidation1 = data.categoryValidation1;
            let subCategoryName = data.subCategoryName;
            let subCategoryField1 = data.subCategoryField1;
            let subCategoryValidation1 = data.subCategoryValidation1;

            delete req.session.oldFormValues;
            let oldFormValues = {};
            // oldFormValues.push({ categoryName: categoryName });
            // oldFormValues.push({ haveData: haveData });
            // oldFormValues.push({ categoryField1: categoryField1 });
            // oldFormValues.push({ categoryValidation1: categoryValidation1 });
            // oldFormValues.push({ subCategoryName: subCategoryName });
            // oldFormValues.push({ subCategoryField1: subCategoryField1 });
            // oldFormValues.push({ subCategoryValidation1: subCategoryValidation1 });

            oldFormValues = {
                categoryName: categoryName,
                haveData: haveData,
                categoryField1: categoryField1,
                categoryValidation1: categoryValidation1,
                subCategoryName: subCategoryName,
                subCategoryField1: subCategoryField1,
                subCategoryValidation1: subCategoryValidation1,
            }

            req.session.oldFormValues = oldFormValues

            if (categoryName === '') {
                error.push({ categoryName: 'Category name is required.' })
            } else if (categoryName.length < 3) {
                error.push({ categoryName: 'Minimum 3 letters needed.' })
            }

            if (haveData === 'on') {

                if (categoryField1 === '') {
                    error.push({ categoryField1: 'Need to fill atleast one category field value.' })
                } else if (categoryField1.length < 3) {
                    error.push({ categoryField1: 'Category field value must be atleast 3 letters.' })
                }

                if (categoryValidation1 === '') {
                    error.push({ categoryValidation1: 'Need to select a validation rule.' })
                }

            } else {

                if (subCategoryName === '') {
                    error.push({ subCategoryName: 'Sub-Category name is required.' })
                } else if (subCategoryName.length < 3) {
                    error.push({ subCategoryName: 'Minimum 3 letters needed.' })
                }

                if (subCategoryField1 === '') {
                    error.push({ subCategoryField1: 'Need to fill atleast one sub-category field value.' })
                } else if (subCategoryField1.length < 3) {
                    error.push({ subCategoryField1: 'Sub-category field value must be atleast 3 letters.' })
                }

                if (subCategoryValidation1 === '') {
                    error.push({ subCategoryValidation1: 'Need to select a validation rule.' })
                }

            }
        } else {

            error.push({ common: 'Please fill required fields.' })
            // error.common = 'Please fill required fields.'
        }

        if (error.length != 0) {
            delete req.session.formValidationError;
            req.session.formValidationError = error;
            res.redirect('/admin/settings/category/add-category');
        } else {
            delete req.session.formValidationError;
            next();
        }
    },
    validateCategoryInputs,
};