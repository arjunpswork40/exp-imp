const { makeJsonResponse } = require("../../../utils/response");
const { body, validationResult } = require('express-validator');
const { Types } = require('mongoose');

const educationalInstitueFileRemoveRequestValidator = [
    body('fileFieldname').isLength({ min: 3 }).withMessage('fileFieldname must be atleast 3 characters'),
    body('fileName').isLength({ min: 3 }).withMessage('fileName must be atleast 3 characters'),
    body('continent').isLength({ min: 3 }).withMessage('Continent must be at least 3 characters'),
    body('instituteId')
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


module.exports = { educationalInstitueFileRemoveRequestValidator };