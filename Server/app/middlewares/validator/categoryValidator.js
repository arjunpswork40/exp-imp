const { makeJsonResponse } = require("../../../utils/response");
const { body, validationResult } = require('express-validator');
const validator = require('validator');

const validateAdvertisementInputs = [
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



module.exports = { validateAdvertisementInputs };