const { Category } = require("../../models/category/Category");
const User = require("../../models/User");
const { makeJsonResponse } = require("../../../utils/response");

module.exports = {

    commonValues: async (req) => {

        let successMessage = req.flash('success');
        let errorMessage = req.flash('error');
        let admin = await User.findOne({ _id: req.user.id })
        const csrfToken = req.csrfToken();
        const categories = await Category.find({}, '_id name').sort({ name: 1 }).populate({
            path: 'subcategories',
            options: { sort: { name: 1 } }, // Sort the 'subcategories' array by 'name' in ascending order
        });
        return {
            successMessage: successMessage,
            errorMessage: errorMessage,
            admin: admin,
            csrfToken: csrfToken,
            categories: categories
        }

    },




};
