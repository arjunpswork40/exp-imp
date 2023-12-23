const User = require("../../../../models/User");
const { makeJsonResponse } = require("../../../../../utils/response");
const { commonValues } = require("../../baseController")
const { ValidationRule, Category, SubCategory, DataField } = require("../../../../models/category/Category")
const { storeCategorySaveOldFormValuesAndErrorsToSession } = require("../../../../../utils/storeToSession");
const express = require('express');
const app = express();
const {
    getCategoryPage,
    getSubCategoryPage
} = require('../../category/adminCategoryController')

module.exports = {

    getAddCategoryPage: async (req, res, next) => {

        let values = await commonValues(req);
        let breadCrumbs = [
            {
                name: 'Home',
                url: '/admin/dashboard'
            },
            {
                name: 'Settings',
                url: '#'
            },
            {
                name: 'Manage Category',
                url: '#'
            },

        ];

        let validationRules = await ValidationRule.find();

        let formErrors = req.session.formValidationError;
        console.log(formErrors)
        let subCategoryShowStatus = (formErrors != undefined && Object.keys(formErrors).length != 0) ? formErrors.find(error => error.subCategoryName) || formErrors.find(error => error.subCategoryField1) || formErrors.find(error => error.subCategoryValidation1) : false;

        let oldFormValues = req.session.oldFormValues;




        res.render("admin/settings/category/index", {
            title: "Manage Category",
            layout: "admin/layout/main",
            pageTitle: 'Manage Category',
            breadCrumbs: breadCrumbs,
            validationRules: validationRules,
            formErrors: formErrors,
            subCategoryShowStatus: subCategoryShowStatus,
            oldFormValues: oldFormValues,
            ...values
        });

    },

    storeCategory: async (req, res, next) => {
        delete req.session.oldFormValues;
        delete req.session.formValidationError;
        let categoryDetails = req.body;
        let imageDetails = req.files;
        let haveDataStatus = (categoryDetails.haveData === 'on') ? true : false;
        let oldFormValues = {
            categoryName: categoryDetails.categoryName,
            haveData: categoryDetails.haveData,
            categoryField1: categoryDetails.categoryField1,
            categoryValidation1: categoryDetails.categoryValidation1,
            subCategoryName: categoryDetails.subCategoryName,
            subCategoryField1: categoryDetails.subCategoryField1,
            subCategoryValidation1: categoryDetails.subCategoryValidation1,
        }

        let dataFieldArray = [];
        let dataFieldsAndType = [];

        if (haveDataStatus) {

            for (const key in categoryDetails) {
                if (key.startsWith('categoryField')) {
                    const valueKey = key.replace('Field', 'Validation');
                    let rule = await ValidationRule.findById(categoryDetails[valueKey]).select('rule');
                    dataFieldsAndType.push({ name: categoryDetails[key].replace(/ /g, '__'), rule: rule.rule })
                    dataFieldArray.push({ name: categoryDetails[key].replace(/ /g, '__'), validationRule: categoryDetails[valueKey] });
                }
            }
        } else {
            for (const key in categoryDetails) {
                if (key.startsWith('subCategoryField')) {
                    const valueKey = key.replace('Field', 'Validation');
                    let rule = await ValidationRule.findById(categoryDetails[valueKey]).select('rule');
                    dataFieldsAndType.push({ name: categoryDetails[key].replace(/ /g, '__'), rule: rule.rule })
                    dataFieldArray.push({ name: categoryDetails[key].replace(/ /g, '__'), validationRule: categoryDetails[valueKey] });
                }
            }
        }

        let category = new Category({
            name: categoryDetails.categoryName,
            have_data: haveDataStatus,
            image: (imageDetails.categoryImage) ? (imageDetails.categoryImage[0].path.replace('uploads', '')) : null,
            // data: haveDataStatus ? dataFieldArray : [],
        });

        let newCategory;

        try {

            if (haveDataStatus) {
                for (let data of dataFieldArray) {
                    data.isCategory = true;
                }
            } else {
                for (let data of dataFieldArray) {
                    data.isCategory = false;
                }
            }



            if (!haveDataStatus) {
                let subCategory = new SubCategory({
                    name: categoryDetails.subCategoryName,
                    have_data: (dataFieldArray.length > 0) ? true : false,
                    image: (imageDetails.subCategoryImage) ? (imageDetails.subCategoryImage[0].path.replace('uploads', '')) : null,
                    dataFieldsAndType: dataFieldsAndType
                    // data: (dataFieldArray.length > 0) ? dataFieldArray : [],
                });

                let subCategoryData;
                try {
                    subCategoryData = await subCategory.save();
                    category.subcategories.push(subCategoryData._id)
                    // let categoryUpdateWithSubCategory = await Category.findByIdAndUpdate(newCategory._id, { subcategories: [subCategoryData._id] }, { new: true })
                    for (let data of dataFieldArray) {
                        data.subCategory = subCategoryData._id;
                    }

                    newCategory = await category.save();
                    if (haveDataStatus) {
                        for (let data of dataFieldArray) {
                            data.category = newCategory._id;
                        }
                    }

                    await DataField.insertMany(dataFieldArray)
                    let subCategoryUpdateWithCategory = await SubCategory.findByIdAndUpdate(subCategoryData._id, { category: newCategory._id }, { new: true })

                } catch (error) {

                    console.log('*************A***************************')
                    console.log(error)
                    console.log('**************A**************************')


                    storeCategorySaveOldFormValuesAndErrorsToSession(req, oldFormValues, [{ common: 'Sub-category save failed. Internal error' }]);

                    res.redirect('/admin/settings/category/add-category');
                }




            } else {
                try {
                    category.dataFieldsAndType = dataFieldsAndType;
                    newCategory = await category.save();
                    if (haveDataStatus) {
                        for (let data of dataFieldArray) {
                            data.category = newCategory._id;
                        }
                    }

                    await DataField.insertMany(dataFieldArray)
                } catch (error) {
                    console.log('********xs*****A***************************')
                    console.log(error)
                    console.log('***********s***A**************************')


                    storeCategorySaveOldFormValuesAndErrorsToSession(req, oldFormValues, [{ common: 'Internal error' }]);

                    res.redirect('/admin/settings/category/add-category');
                }
            }



        } catch (error) {
            console.log('**********e***A***************************')
            console.log(error)
            console.log('************e**A**************************')

            storeCategorySaveOldFormValuesAndErrorsToSession(req, oldFormValues, [{ common: 'Category save failed. Internal error' }]);
            res.redirect('/admin/settings/category/add-category');

        }

        // const handler = (req, res) => {
        //     res.send(`This is the ${category.name} category!`);
        // };

        // app.use((haveDataStatus) ? '/admin/category/' + categoryDetails.categoryName : '/admin/category/' + categoryDetails.categoryName + '/' + categoryDetails.subCategoryName, handler)

        // res.redirect((haveDataStatus) ? '/admin/category/' + categoryDetails.categoryName : '/admin/category/' + categoryDetails.categoryName + '/' + categoryDetails.subCategoryName);

        // app.get('/admin/category/' + categoryDetails.categoryName, (req, res) => {
        //     getCategoryPage(req, res, newCategory);
        // })

        res.redirect('/admin/settings/category/add-category');



    }
};
