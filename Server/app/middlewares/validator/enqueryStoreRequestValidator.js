const { makeJsonResponse } = require("../../../utils/response");
const { body, validationResult } = require('express-validator');
const validator = require('validator');
const { Types } = require('mongoose');

const enqueryStoreRequestValidator = [
    body('name').isLength({ min: 3 }).withMessage('Name must be atleast 3 characters'),
    body('phone')
        .notEmpty().withMessage('Mobile number is required')
        .custom((value) => {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Invalid mobile number');
            }
            // Return true if validation succeeds
            return true;
        }),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email address'),
    body('continent').isLength({ min: 3 }).withMessage('Continent must be at least 3 characters'),
    body('countryId')
        .exists()
        .custom(value => Types.ObjectId.isValid(value)).withMessage('Invalid countryId'),
    body('instituteId')
        .exists()
        .custom(value => Types.ObjectId.isValid(value)).withMessage('Invalid instituteId'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            response = makeJsonResponse(`Validation error.`, {}, errors.array(), 400, false);
            return res.status(400).json(response);
        }
        next();
    }
];


module.exports = { enqueryStoreRequestValidator };