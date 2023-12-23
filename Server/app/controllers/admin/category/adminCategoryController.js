const User = require("../../../models/User");
const Feedback = require("../../../models/Feedback");
const { makeJsonResponse } = require("../../../../utils/response");
const { Category, SubCategory, DataField, ValidationRule } = require('../../../models/category/Category')
const { commonValues } = require("../baseController")
const { sortTableDataByTableHeader } = require('../../../../utils/category');
const { isObjectIdOrHexString } = require("mongoose");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const {
    getImageDataFieldInCategory,
    getImageDataFieldInSubCategory
} = require('../../../../utils/category');

module.exports = {

    getCategoryPage: async (req, res, next) => {

        const categoryId = req.params.category;
        // const objectIdPattern = /^[0-9a-fA-F]{24}$/;
        const objectIdPattern = /^[0-9a-f]{24}$/i;
        const objectIdCheck = objectIdPattern.test(categoryId);
        if (objectIdCheck) {

            const categoryObjectId = new ObjectId(categoryId);
            const category = await Category.findById(categoryObjectId).populate('subcategories');
            let dataFieldWithImageRule = category ? await getImageDataFieldInCategory(category) : '';

            let fieldAndValidationRule = await DataField.find({ category: categoryObjectId }).populate('validationRule');

            // initialize empty objects for rules and messages
            let jQueryValidationRules = {};
            let jQueryValidationMessages = {};

            // loop through each object in the array
            for (let obj of fieldAndValidationRule) {
                // extract field and validation rule details from the current object
                let fieldName = obj.name;
                let validationRule = obj.validationRule.rule;

                // add rules and messages based on the validation rule
                if (validationRule === 'Image') {
                    jQueryValidationRules.image = { required: true, accept: "image/jpeg,image/png,image/gif", filesize: 15000000 };
                    jQueryValidationMessages.image = { required: 'This field is required.', accept: "Please upload a valid image (jpg, jpeg, png, or gif).", filesize: "File size must be less than 15 MB." };
                } else {
                    jQueryValidationRules[fieldName] = { required: true, minlength: 3 };
                    jQueryValidationMessages[fieldName] = { required: 'Please enter a value for this field.', minlength: 'Value must be at least 3 characters long.' };
                }
            }



            if (category) {
                let breadCrumbs = [
                    {
                        name: 'Home',
                        url: '/admin/dashboard'
                    },
                    {
                        name: 'Category',
                        url: '#'
                    },
                    {
                        name: category.name,
                        url: '#'
                    },
                ];
                let tableHeaders = [
                    'ID',
                    'Unique ID',
                    'Sub Category name',
                    'Sub Category data count',
                    'Image',
                    'Action'
                ];
                let tableData = [];
                if (category.have_data) {
                    let data = category.data;

                    // From all data objects, take keys of each
                    const keysArray = data.reduce((acc, obj) => {
                        return [...acc, ...Object.keys(obj)];
                    }, []);

                    // Take all unique keys for table header
                    let uniqueKeysArray = ['ID', ...new Set(keysArray), 'ACTION'];

                    // Add 'ID' and 'Action' columns if they are not already in the array, if exist in any other form then remove it(inorder to prevent duplication)
                    if (!uniqueKeysArray.includes('ID') && !uniqueKeysArray.includes('Id') && !uniqueKeysArray.includes('id')) {
                        uniqueKeysArray.push('ID');
                    }
                    if (uniqueKeysArray.includes('Id')) {
                        uniqueKeysArray = uniqueKeysArray.filter(header => header !== 'Id');
                    }
                    if (uniqueKeysArray.includes('id')) {
                        uniqueKeysArray = uniqueKeysArray.filter(header => header !== 'id');
                    }

                    if (!uniqueKeysArray.includes('Action') && !uniqueKeysArray.includes('action') && !uniqueKeysArray.includes('ACTION')) {
                        uniqueKeysArray.push('Action');
                    }

                    if (uniqueKeysArray.includes('Action')) {
                        uniqueKeysArray = uniqueKeysArray.filter(header => header !== 'Action');
                    }
                    if (uniqueKeysArray.includes('action')) {
                        uniqueKeysArray = uniqueKeysArray.filter(header => header !== 'action');
                    }

                    const capitalizedKeysArray = uniqueKeysArray.map((key) => {
                        return key.charAt(0).toUpperCase() + key.slice(1);
                    });

                    tableHeaders = capitalizedKeysArray;
                    let i = 0;
                    let j = -1;
                    data.map((categoryData) => {
                        j = j + 1;
                        i = i + 1;

                        categoryData.id = i;
                        categoryData.action = j;
                    });

                    let sortedTableData = await sortTableDataByTableHeader(tableHeaders, data);
                    tableData = sortedTableData;

                } else {
                    const subCategoryTableData = [];
                    let i = 0;
                    category.subcategories.map((subCategory) => {
                        i = i + 1;
                        subCategoryTableData.push({
                            id: i,
                            uniqueid: subCategory._id,
                            subcategoryname: subCategory.name,
                            subcategorydatacount: subCategory.data.length,
                            image: subCategory.image,
                            action: subCategory._id
                        });
                    });

                    tableData = subCategoryTableData;
                }

                let values = await commonValues(req);
                let dataFields = await DataField.find({ category: categoryObjectId }).populate('validationRule')

                // const uniqueRuleValues = [...new Set(dataFields.map(obj => obj.validationRule.rule))];

                let validationRules = await ValidationRule.find();
                // let validationRuleForEdit = await ValidationRule.find({
                //     rule: {
                //         $nin: uniqueRuleValues
                //     }
                // });
                res.render("admin/category/index", {
                    title: "Category",
                    layout: "admin/layout/main",
                    category: category,
                    pageTitle: category.name,
                    breadCrumbs: breadCrumbs,
                    tableHeaders: tableHeaders,
                    tableData: tableData,
                    dataFields: dataFields,
                    validationRules: validationRules,
                    fieldAndValidationRule: fieldAndValidationRule,
                    jQueryValidationRules: JSON.stringify(jQueryValidationRules),
                    jQueryValidationMessages: JSON.stringify(jQueryValidationMessages),
                    dataFieldWithImageRule: dataFieldWithImageRule,
                    // validationRuleForEdit: validationRuleForEdit,
                    ...values
                });
            } else {
                req.flash('error', 'Internal Error Occured.')
                res.redirect('/admin/coming-soon')
            }
        } else {
            req.flash('error', 'Internal Error Occured.')
            res.redirect('/admin/coming-soon')
        }

    },

    deleteCategory: async (req, res, next) => {
        let categoryId = req.body.categoryId;

        try {
            let dataFieldDelete = await DataField.deleteMany({ category: ObjectId(categoryId) });

            let subCategoryDelete = await SubCategory.deleteMany({ category: ObjectId(categoryId) });

            let categoryDelete = await Category.deleteMany({ _id: ObjectId(categoryId) })
            req.flash('success', 'Category deleted successfuly.')
            res.redirect('/admin/dashboard')

        } catch (error) {
            console.log(['============================'])
            console.log(error)
            console.log(['============================'])

            req.flash('error', 'Internal server error.')
            res.redirect('/admin/category/' + categoryId)
        }
    },
    addDataFieldsToCategory: async (req, res, next) => {
        let categoryId = req.body.categoryId;
        let body = req.body;
        let dataFieldsAndType = [];
        let dataFieldArray = [];

        try {
            for (const key in body) {
                if (key.startsWith('categoryField')) {
                    const valueKey = key.replace('Field', 'Validation');
                    let rule = await ValidationRule.findById(body[valueKey]).select('rule');
                    dataFieldsAndType.push({ name: body[key].replace(/ /g, '__'), rule: rule.rule });
                    if (body[valueKey] !== '') {
                        dataFieldArray.push({
                            name: body[key].replace(/ /g, '__'),
                            validationRule: mongoose.Types.ObjectId(body[valueKey]),
                            isCategory: true,
                            category: mongoose.Types.ObjectId(categoryId)
                        });
                    }
                }
            }

            await Category.findOneAndUpdate(
                { _id: categoryId },
                {
                    $push: { dataFieldsAndType: { $each: dataFieldsAndType } }
                }

            )
            await DataField.insertMany(dataFieldArray)
            req.flash('success', 'Data fields added successfuly.')
            res.redirect('/admin/category/' + categoryId)

        } catch (error) {
            console.log(['============================'])
            console.log(error)
            console.log(['============================'])

            req.flash('error', 'Internal server error.')
            res.redirect('/admin/category/' + categoryId)
        }
    },
    changeRecommendStatus: async (req, res, next) => {
        const categoryId = req.body.categoryId;
        try {
            let category = await Category.findById(ObjectId(categoryId));
            let message = 'Category added to recommended list';
            let updateStatus = {
                recommendedStatus: false
            }
            if (category.recommendedStatus) {
                updateStatus.recommendedStatus = false
                message = 'Category removed from recommended list'
            } else {
                updateStatus.recommendedStatus = true
            }

            let categoryRecommendedUpdate = await Category.findByIdAndUpdate(
                category._id,
                updateStatus,
                {
                    new: true,
                    runValidators: true
                }
            )

            if (categoryRecommendedUpdate) {
                req.flash('success', message)
                res.redirect('/admin/category/' + category._id)
            } else {
                req.flash('error', 'Internal Error Occured.')
                res.redirect('/admin/category/' + category._id)
            }

        } catch (error) {
            req.flash('error', 'Internal Error Occured.')
            res.redirect('/admin/category/' + category._id)

        }

    },

    getSubCategoryPage: async (req, res, next) => {

        const categoryId = req.params.category;
        const subCategoryId = req.params.subcategory;



        // const objectIdPattern = /^[0-9a-fA-F]{24}$/;
        const objectIdPattern = /^[0-9a-f]{24}$/i;
        const objectIdCheck = objectIdPattern.test(categoryId);
        const objectIdSubCatCheck = objectIdPattern.test(subCategoryId);
        if (objectIdCheck && objectIdSubCatCheck) {
            const categoryObjectId = new ObjectId(categoryId);
            const subCategoryObjectId = new ObjectId(subCategoryId);
            const category = await Category.findById(categoryObjectId);
            const subcategory = await SubCategory.findById(subCategoryObjectId);
            let dataFieldWithImageRule = subcategory ? await getImageDataFieldInSubCategory(subcategory) : '';
            let fieldAndValidationRule = await DataField.find({ subCategory: subCategoryObjectId }).populate('validationRule');



            // initialize empty objects for rules and messages
            let jQueryValidationRules = {};
            let jQueryValidationMessages = {};

            // loop through each object in the array
            for (let obj of fieldAndValidationRule) {
                // extract field and validation rule details from the current object
                let fieldName = obj.name;
                let validationRule = obj.validationRule.rule;

                // add rules and messages based on the validation rule
                if (validationRule === 'Image') {
                    jQueryValidationRules.image = { required: true, accept: "image/jpeg,image/png,image/gif", filesize: 15000000 };
                    jQueryValidationMessages.image = { required: 'This field is required.', accept: "Please upload a valid image (jpg, jpeg, png, or gif).", filesize: "File size must be less than 15 MB." };
                } else {
                    jQueryValidationRules[fieldName] = { required: true, minlength: 3 };
                    jQueryValidationMessages[fieldName] = { required: 'Please enter a value for this field.', minlength: 'Value must be at least 3 characters long.' };
                }
            }

            if (category && subcategory) {
                let breadCrumbs = [
                    {
                        name: 'Home',
                        url: '/admin/dashboard'
                    },
                    {
                        name: 'Category',
                        url: '#'
                    },
                    {
                        name: category.name,
                        url: '/admin/category/' + category._id
                    },
                    {
                        name: subcategory.name,
                        url: '#'
                    },
                ];
                let tableHeaders = [
                    'ID',
                    'Unique ID',
                    'Sub-category name',
                    'Sub-category data count',
                    'Image',
                    'Action'
                ];
                let tableData = [];
                let data = subcategory.data;

                // From all data objects, take keys of each
                const keysArray = data.reduce((acc, obj) => {
                    return [...acc, ...Object.keys(obj)];
                }, []);

                // Take all unique keys for table header
                let uniqueKeysArray = ['ID', ...new Set(keysArray), 'ACTION'];

                // Add 'ID' and 'Action' columns if they are not already in the array, if exist in any other form then remove it(inorder to prevent duplication)
                if (!uniqueKeysArray.includes('ID') && !uniqueKeysArray.includes('Id') && !uniqueKeysArray.includes('id')) {
                    uniqueKeysArray.push('ID');
                }
                if (uniqueKeysArray.includes('Id')) {
                    uniqueKeysArray = uniqueKeysArray.filter(header => header !== 'Id');
                }
                if (uniqueKeysArray.includes('id')) {
                    uniqueKeysArray = uniqueKeysArray.filter(header => header !== 'id');
                }

                if (!uniqueKeysArray.includes('Action') && !uniqueKeysArray.includes('action') && !uniqueKeysArray.includes('ACTION')) {
                    uniqueKeysArray.push('Action');
                }

                if (uniqueKeysArray.includes('Action')) {
                    uniqueKeysArray = uniqueKeysArray.filter(header => header !== 'Action');
                }
                if (uniqueKeysArray.includes('action')) {
                    uniqueKeysArray = uniqueKeysArray.filter(header => header !== 'action');
                }

                const capitalizedKeysArray = uniqueKeysArray.map((key) => {
                    return key.charAt(0).toUpperCase() + key.slice(1);
                });

                tableHeaders = capitalizedKeysArray;
                let i = 0;
                let j = -1;
                data.map((categoryData) => {
                    j = j + 1;
                    i = i + 1;

                    categoryData.id = i;
                    categoryData.action = j;
                });

                let sortedTableData = await sortTableDataByTableHeader(tableHeaders, data);
                tableData = sortedTableData;

                let values = await commonValues(req);
                let dataFields = await DataField.find({ subCategory: subCategoryObjectId }).populate('validationRule')

                res.render("admin/category/subcategory/index", {
                    title: "Category",
                    layout: "admin/layout/main",
                    category: category,
                    pageTitle: category.name,
                    breadCrumbs: breadCrumbs,
                    tableHeaders: tableHeaders,
                    tableData: tableData,
                    dataFields: dataFields,
                    subcategory: subcategory,
                    jQueryValidationRules: JSON.stringify(jQueryValidationRules),
                    jQueryValidationMessages: JSON.stringify(jQueryValidationMessages),
                    dataFieldWithImageRule: dataFieldWithImageRule,
                    ...values
                });

            } else {
                req.flash('error', 'Internal Error Occured.')
                res.redirect('/admin/coming-soon')
            }
        } else {
            req.flash('error', 'Internal Error Occured.')
            res.redirect('/admin/coming-soon')
        }



    },



    async storeSubCategoryData(req, res, next) {

        let subCategoryId = req.body.subcategoryId;
        let categoryId = req.body.categoryId
        let body = req.body;

        delete body.subcategoryId;
        delete body.categoryId;
        delete body._csrf;

        let imageData = req.files;
        let newData = body;


        if (imageData && imageData.image) {
            let data = imageData[0];
            let imageFieldEntries = []
            for (let image of imageData.image) {
                let detail = (image.path) ? image.path.replace('uploads', '') : '';

                imageFieldEntries.push(detail)
            }
            let fields = await DataField.find({
                subCategory: subCategoryId
            })
                .populate('validationRule')
                .exec();

            const dataFieldWithImageRule = fields.filter(field => {
                return field.validationRule && field.validationRule.rule === 'Image'
            })

            imageData.image ? (newData[dataFieldWithImageRule[0].name] = imageFieldEntries) : ''


        }


        try {
            let subCategoryData = await SubCategory.findByIdAndUpdate(
                subCategoryId,
                {
                    $push: {
                        data: newData
                    }
                },
                { new: true }
            )

        } catch (error) {
            console.log('===============================')
            console.log(error)
            console.log('===============================')

            req.flash('error', 'Internal Error Occured.')
            res.redirect('/admin/category/' + categoryId + '/' + subCategoryId)
        }

        req.flash('success', 'SubCategory Data Stored Successfuly')
        res.redirect('/admin/category/' + categoryId + '/' + subCategoryId)

    },

    async storeSubCategory(req, res, next) {
        let imageDetails = req.files;
        let body = req.body;
        try {

            let subCategory = new SubCategory({
                name: body.subcategoryName,
                have_data: true,
                image: (imageDetails.subCategoryImage) ? (imageDetails.subCategoryImage[0].path.replace('uploads', '')) : null,
                category: new ObjectId(body.categoryId),
            });

            let subCategoryStore = await subCategory.save()

            let categoryData = await Category.findByIdAndUpdate(
                new ObjectId(body.categoryId),
                {
                    $push: {
                        subcategories: subCategoryStore._id
                    }
                },
                { new: true }
            )

            let dataFieldArray = [];
            let dataFieldsAndType = [];

            for (const key in body) {
                if (key.startsWith('subCategoryField')) {
                    const valueKey = key.replace('Field', 'Validation');
                    let rule = await ValidationRule.findById(body[valueKey]).select('rule');
                    dataFieldsAndType.push({ name: body[key].replace(/ /g, '__'), rule: rule.rule });
                    dataFieldArray.push({ name: body[key].replace(/ /g, '__'), validationRule: body[valueKey], isCategory: false, subCategory: subCategoryStore._id });
                }
            }

            await SubCategory.findByIdAndUpdate(
                { _id: subCategoryStore._id },
                {
                    dataFieldsAndType: dataFieldsAndType
                },
                { new: true }
            )

            await DataField.insertMany(dataFieldArray)

            req.flash('success', 'Sub-Category Created Successfuly')
            res.redirect('/admin/category/' + body.categoryId)
        } catch (error) {
            console.log(error)
            req.flash('error', 'Sub-Category Creation Failed')
            res.redirect('/admin/category/' + body.categoryId)
        }

    },
    async storeCategoryData(req, res, next) {
        let categoryId = req.body.categoryId
        let body = req.body;

        delete body.categoryId;
        delete body._csrf;

        let imageData = req.files;
        let newData = body;

        if (imageData && imageData.image) {
            let data = imageData[0];
            let imageFieldEntries = []
            for (let image of imageData.image) {
                let detail = (image.path) ? image.path.replace('uploads', '') : '';

                imageFieldEntries.push(detail)
            }

            let fields = await DataField.find({
                category: categoryId
            })
                .populate('validationRule')
                .exec();
            const dataFieldWithImageRule = fields.filter(field => {
                return field.validationRule && field.validationRule.rule === 'Image'
            })

            dataFieldWithImageRule[0] ? (newData[dataFieldWithImageRule[0].name] = imageFieldEntries) : ''
        }
        try {
            let categoryData = await Category.findByIdAndUpdate(
                categoryId,
                {
                    $push: {
                        data: newData
                    }
                },
                { new: true }
            )

        } catch (error) {
            console.log('===============================')
            console.log(error)
            console.log('===============================')

            req.flash('error', 'Internal Error Occured')
            res.redirect('/admin/category/' + categoryId)
        }
        req.flash('success', 'Category Data Stored Successfuly')
        res.redirect('/admin/category/' + categoryId)
    },
    async getCategoryDataForEdit(req, res, next) {
        const categoryId = req.body.categoryid;
        const dataEntry = req.body.dataentry;

        try {
            let category = await Category.findById(new ObjectId(categoryId));

            let dataForEdit = category.data[dataEntry];

            response = makeJsonResponse("Data for edit.", { data: dataForEdit, category: category, dataEntry: dataEntry }, {}, 200, true);
            res.status(200).json(response);
        } catch (error) {
            response = makeJsonResponse("Some error occured.", {}, err, 500, false);
            res.status(500).json(response);
        }
    },
    async updateCategoryData(req, res, next) {
        let body = req.body;
        let categoryId = ObjectId(req.body.categoryId);
        let dataEntryPosition = req.body.dataEntryPosition;
        try {

            const setArgument = {};

            delete body._csrf;
            delete body.categoryId;
            delete body.dataEntryPosition;

            let imageData = req.files;

            let fields = await DataField.find({
                category: categoryId
            })
                .populate('validationRule')
                .exec();

            const dataFieldWithImageRule = fields.filter(field => {
                return field.validationRule && field.validationRule.rule === 'Image'
            })

            if (imageData && imageData.image) {
                let data = imageData[0];
                let imageFieldEntries = []
                for (let image of imageData.image) {
                    let detail = (image.path) ? image.path.replace('uploads', '') : '';

                    imageFieldEntries.push(detail)
                }

                // let fields = await DataField.find({
                //     category: categoryId
                // })
                //     .populate('validationRule')
                //     .exec();

                // const dataFieldWithImageRule = fields.filter(field => {
                //     return field.validationRule && field.validationRule.rule === 'Image'
                // })


                imageData.image ? (body[dataFieldWithImageRule[0].name] = imageFieldEntries) : '';


            }

            if (typeof body === 'object' && body !== null) {
                const obj = Object.assign({}, body);
                if (imageData && imageData.image) {
                    let updateFieldName = '';
                    if (typeof body === 'object' && body !== null) {
                        const obj = Object.assign({}, body);
                        for (let key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                if (dataFieldWithImageRule[0].name === key) {
                                    updatStatus = true;
                                    updateFieldName = key;
                                }
                            }
                        }
                    }
                    let dataNeedToUpdate = await Category.findById(categoryId);
                    let currentImages = dataNeedToUpdate.data[dataEntryPosition][updateFieldName]
                    let newImageValues = body[dataFieldWithImageRule[0].name];
                    // currentImages ? currentImages.push(...newImageValues) : currentImages = newImageValues;
                    currentImages ? ((typeof currentImages != 'string') ? currentImages.push(...newImageValues) : currentImages = [currentImages, ...newImageValues]) : currentImages = newImageValues;

                    for (let key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            let value = obj[key];
                            let dbKey = "data." + dataEntryPosition + "." + key;
                            if (dataFieldWithImageRule[0].name === key) {
                                setArgument[dbKey] = currentImages;
                            } else {
                                setArgument[dbKey] = value;
                            }
                        }
                    }
                } else {
                    for (let key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            let value = obj[key];
                            let dbKey = "data." + dataEntryPosition + "." + key;
                            setArgument[dbKey] = value;
                        }
                    }
                }
                const updatedCategory = await Category.updateOne(
                    { _id: categoryId },
                    { $set: setArgument },
                    { new: true }
                );
            } else {
                console.log('Invalid body object');
            }



            const updatedCategory = await Category.updateOne(
                { _id: categoryId },
                { $set: setArgument },
                { new: true }
            );

            req.flash('success', 'Category Data Updated Successfuly!');
            res.redirect('/admin/category/' + categoryId)
        } catch (e) {
            console.log(e)
            req.flash('error', 'Some Internal Error Occured..!');
            res.redirect('/admin/category/' + categoryId)
        }
    },
    async deleteCategoryData(req, res, next) {
        let body = req.body;
        let categoryId = ObjectId(req.body.categoryId);
        let dataEntryPosition = req.body.dataEntryPosition;
        try {
            const deleteDataFieldName = "data." + dataEntryPosition;
            const setArgument = {};
            setArgument[deleteDataFieldName] = "";

            const updatedCategoryTonull = await Category.updateOne(
                { _id: categoryId },
                { $unset: { [`data.${dataEntryPosition}`]: "" } },
                { new: true }
            );

            const updatedCategory = await Category.updateOne(
                { _id: categoryId },
                { $pull: { data: null } },
                { new: true }
            );

            req.flash('success', 'Category Data Deleted!');
            res.redirect('/admin/category/' + categoryId)
        } catch (e) {
            req.flash('error', 'Some Internal Error Occured..!');
            res.redirect('/admin/category/' + categoryId)
        }
    },
    async deleteSubCategory(req, res, next) {
        const { subCategoryId, categoryId } = req.body;
        try {
            const subCategoryObjectId = mongoose.Types.ObjectId(subCategoryId);

            await Category.updateOne(
                { _id: mongoose.Types.ObjectId(categoryId) },
                { $pull: { subcategories: subCategoryObjectId } }
            );

            await DataField.deleteMany({ subCategory: subCategoryObjectId });

            await SubCategory.findByIdAndDelete(subCategoryObjectId);

            req.flash('success', 'Sub-Category Deleted!');
            res.redirect(`/admin/category/${categoryId}`);
        } catch (error) {
            console.error(error);
            req.flash('error', 'Internal Error Occurred');
            res.redirect(`/admin/category/${categoryId}`);
        }
    },

    async editSubCategory(req, res, next) {


        let imageDetails = req.files;
        let subCategoryId = req.body.subCategoryId;
        let name = req.body.subcategoryName;
        let categoryId = req.body.categoryId;

        try {
            subCategoryId = mongoose.Types.ObjectId(subCategoryId);

            let dataToUpdate = {};
            if (imageDetails.subCategoryImage) {
                dataToUpdate.name = name;
                dataToUpdate.image = imageDetails.subCategoryImage[0].path.replace('uploads', '');
            } else {
                dataToUpdate.name = name;
            }


            let dataFieldArray = [];
            let body = req.body;
            let dataFieldsAndType = [];
            for (const key in body) {
                if (key.startsWith('subCategoryField')) {
                    const valueKey = key.replace('Field', 'Validation');
                    let rule = await ValidationRule.findById(body[valueKey]).select('rule');
                    dataFieldsAndType.push({ name: body[key].replace(/ /g, '__'), rule: rule.rule });
                    if (body[valueKey] !== '') {
                        dataFieldArray.push({
                            name: body[key].replace(/ /g, '__'),
                            validationRule: body[valueKey],
                            isCategory: false,
                            subCategory: subCategoryId
                        });
                    }
                }
            }
            let subCategoryData = await SubCategory.findByIdAndUpdate(
                { _id: subCategoryId },
                {
                    $set: dataToUpdate,
                    $push: {
                        dataFieldsAndType: { $each: dataFieldsAndType }
                    }
                },
                { new: true }
            )
            await DataField.insertMany(dataFieldArray)


            req.flash('success', 'Sub-Category Updated successfult!');
            res.redirect(`/admin/category/${categoryId}`);
        } catch (error) {

            console.log(['************************'])
            console.log(error)
            console.log(['************************'])



            req.flash('error', 'Internal Error Ocuured...!');
            res.redirect(`/admin/category/${categoryId}`);
        }


    },
    async deleteSubCategoryData(req, res, next) {
        const { subcategoryId, dataPositionId, categoryId } = req.body;
        try {

            const updateSubCategoryTonull = await SubCategory.updateOne(
                { _id: ObjectId(subcategoryId) },
                { $unset: { [`data.${dataPositionId}`]: "" } },
                { new: true }
            );

            const updateSubCategory = await SubCategory.updateOne(
                { _id: ObjectId(subcategoryId) },
                { $pull: { data: null } },
                { new: true }
            );

            req.flash('success', 'Sub-Category Data Deleted!');
            res.redirect('/admin/category/' + categoryId + '/' + subcategoryId)
        } catch (e) {

            console.log(['*****************************'])
            console.log(e)
            console.log(['*****************************'])

            req.flash('error', 'Some Internal Error Occured..!');
            res.redirect('/admin/category/' + categoryId + '/' + subcategoryId)
        }

    },
    async getSubCategoryDataForEdit(req, res, next) {
        const subCategoryId = req.body.subCategoryId;
        const dataEntry = req.body.dataentry;
        try {
            let subCategory = await SubCategory.findById(new ObjectId(subCategoryId));

            let dataForEdit = subCategory.data[dataEntry];
            response = makeJsonResponse("Data for edit.", { data: dataForEdit, subCategory: subCategory, dataEntry: dataEntry }, {}, 200, true);
            res.status(200).json(response);
        } catch (error) {

            console.log(['*****************************'])
            console.log(error)
            console.log(['*****************************'])

            response = makeJsonResponse("Some error occured.", {}, error, 500, false);
            res.status(500).json(response);
        }
    },
    async updateSubCategoryData(req, res, next) {
        let body = req.body;
        let categoryId = req.body.categoryId;
        let subCategorydataEntryPosition = req.body.subCategorydataEntryPosition;
        let subCategoryId = req.body.subcategoryId;

        if (categoryId != undefined || subCategorydataEntryPosition != undefined || subCategoryId != undefined) {

            try {

                const setArgument = {};

                delete body._csrf;
                delete body.categoryId;
                delete body.subCategorydataEntryPosition;
                delete body.subcategoryId;

                let imageData = req.files;
                let fields = await DataField.find({
                    subCategory: subCategoryId
                })
                    .populate('validationRule')
                    .exec();

                const dataFieldWithImageRule = fields.filter(field => {
                    return field.validationRule && field.validationRule.rule === 'Image'
                })


                if (imageData && imageData.image) {
                    let data = imageData[0];
                    console.log('data==>', data)
                    console.log('imageData=>', imageData)
                    let imageFieldEntries = []
                    if (imageData.image) {
                        for (let image of imageData.image) {
                            let detail = (image.path) ? image.path.replace('uploads', '') : '';

                            imageFieldEntries.push(detail)
                        }
                        imageData.image ? (body[dataFieldWithImageRule[0].name] = imageFieldEntries) : '';

                    }



                    // body[dataFieldWithImageRule[0].name] = (imageData.image[0].path) ? imageData.image[0].path.replace('uploads', '') : ''


                }
                if (typeof body === 'object' && body !== null) {
                    const obj = Object.assign({}, body);
                    if (imageData && imageData.image) {
                        let updateFieldName = '';
                        if (typeof body === 'object' && body !== null) {
                            const obj = Object.assign({}, body);
                            for (let key in obj) {
                                if (obj.hasOwnProperty(key)) {
                                    if (dataFieldWithImageRule[0].name === key) {
                                        updatStatus = true;
                                        updateFieldName = key;
                                    }
                                }
                            }
                        }
                        let dataNeedToUpdate = await SubCategory.findById(subCategoryId);
                        let currentImages = dataNeedToUpdate.data[subCategorydataEntryPosition][updateFieldName]
                        let newImageValues = body[dataFieldWithImageRule[0].name];
                        currentImages ? ((typeof currentImages != 'string') ? currentImages.push(...newImageValues) : currentImages = [currentImages, ...newImageValues]) : currentImages = newImageValues;

                        for (let key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                let value = obj[key];
                                let dbKey = "data." + subCategorydataEntryPosition + "." + key;
                                if (dataFieldWithImageRule[0].name === key) {
                                    setArgument[dbKey] = currentImages;
                                } else {
                                    setArgument[dbKey] = value;
                                }
                            }
                        }
                    } else {
                        for (let key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                let value = obj[key];
                                let dbKey = "data." + subCategorydataEntryPosition + "." + key;
                                setArgument[dbKey] = value;
                            }
                        }
                    }



                    const updatedCategory = await SubCategory.updateOne(
                        { _id: subCategoryId },
                        { $set: setArgument },
                        { new: true }
                    );

                } else {
                    req.flash('error', 'Some Internal Error Occured.Invalid body object.!');
                    res.redirect('/admin/category/' + categoryId + '/' + subCategoryId)
                    console.log('Invalid body object');
                }

                req.flash('success', 'Category Data Updated Successfuly!');
                res.redirect('/admin/category/' + categoryId + '/' + subCategoryId)
            } catch (e) {
                console.log(e)
                req.flash('error', 'Some Internal Error Occured..!');
                res.redirect('/admin/category/' + categoryId + '/' + subCategoryId)
            }
        } else {
            req.flash('error', 'Some Internal Error Occured..!');
            res.redirect('/admin/category/' + categoryId + '/' + subCategoryId)
        }
    },

    async editCategory(req, res, next) {
        let imageData = req.files;
        let categoryName = req.body.categoryName;
        let categoryId = req.body.categoryId
        let updateData = {
            name: categoryName
        }
        if (categoryId != null) {
            if (imageData.categoryImage) {
                updateData.image = imageData.categoryImage[0].path.replace('uploads', '')
            }
            try {
                let categoryEdit = await Category.findByIdAndUpdate(categoryId, updateData,
                    {
                        new: true,
                        runValidators: true
                    })
                req.flash('success', 'Category Details Updated Successfuly!');
                res.redirect('/admin/category/' + categoryId)
            } catch (error) {
                req.flash('error', 'Some Internal Error Occured..!');
                res.redirect('/admin/category/' + categoryId)
            }
        } else {
            req.flash('error', 'Some Internal Error Occured..!');
            res.redirect('/admin/category/' + categoryId)
        }

    },
    async getImageGalleryPage(req, res, next) {
        let type = req.params.type;
        let id = req.params.id;
        let data_id = req.params.data_id;

        if (type && id && data_id) {
            let values = await commonValues(req);
            let images = [];
            if (type === 'category') {
                let category = await Category.findById(id).select('name data dataFieldsAndType');
                let dataFieldsAndType = category.dataFieldsAndType;

                let imageFieldName = dataFieldsAndType.find(item => item.rule === 'Image')?.name;
                let responseData = category.data[data_id - 1]
                let response = {};
                response.images = responseData ? responseData[imageFieldName] : [];
                response.position = data_id - 1;

                let breadCrumbs = [
                    {
                        name: 'Home',
                        url: '/admin/dashboard'
                    },
                    {
                        name: 'Category',
                        url: '#'
                    },
                    {
                        name: category.name,
                        url: '#'
                    },
                ];
                res.render("admin/category/image-album", {
                    title: "Category Image Album",
                    layout: "admin/layout/main",
                    category: category,
                    subcategoryStatus: false,
                    pageTitle: 'Uploaded Image Album - ' + category.name,
                    response: response,
                    breadCrumbs: breadCrumbs,
                    imageFieldName: imageFieldName,
                    backButtonUrl: `/admin/category/${category._id}/`,
                    ...values
                });
            } else if (type == 'subcategory') {

                let subcategory = await SubCategory.findById(id).select('name data dataFieldsAndType category').populate('category');
                let dataFieldsAndType = subcategory.dataFieldsAndType;

                let imageFieldName = dataFieldsAndType.find(item => item.rule === 'Image')?.name;

                let responseData = subcategory.data[data_id - 1]
                let response = {};

                response.images = responseData ? responseData[imageFieldName] : [];
                response.position = data_id - 1;

                let breadCrumbs = [
                    {
                        name: 'Home',
                        url: '/admin/dashboard'
                    },
                    {
                        name: subcategory.category.name,
                        url: '/admin/category' + subcategory.category._id
                    },
                    {
                        name: subcategory.name,
                        url: '#'
                    },
                ];
                res.render("admin/category/image-album", {
                    title: "Category Image Album",
                    layout: "admin/layout/main",
                    category: subcategory.category,
                    subcategory: subcategory,
                    pageTitle: 'Uploaded Image Album - ' + subcategory.name,
                    response: response,
                    breadCrumbs: breadCrumbs,
                    subcategoryStatus: true,
                    backButtonUrl: `/admin/category/${subcategory.category._id}/${subcategory._id}`,
                    subcategory: subcategory,
                    imageFieldName: imageFieldName,
                    ...values
                });
            } else {
                req.flash('error', 'Wrong URL');
                res.redirect('/admin/dashboard')
            }
        } else {
            req.flash('error', 'Some Internal Error Occured..!');
            res.redirect('/admin/dashboard')
        }
    },
    async deleteImageFromAlbum(req, res, next) {
        let type = req.params.type;
        let id = req.params.id;
        let data_id = req.params.data_id;
        let field_name = req.params.field_name;
        let image_entry = req.params.image_entry;

        if (type && id && data_id && field_name) {
            if (type === 'category') {
                let dataNeedToEdit = await Category.findById(id);
                let imageDataFieldName = `data.${data_id}.${field_name}`;
                let imageDataArray = dataNeedToEdit.data[data_id][field_name];
                imageDataArray.splice(image_entry, 1);

                let setArgument = {};
                setArgument[imageDataFieldName] = imageDataArray;

                const updatedCategory = await Category.updateOne(
                    { _id: id },
                    { $set: setArgument },
                    { new: true }
                );
                req.flash('success', 'Image removed successfuly.');
                res.redirect(`/admin/category/details/images/album/category/${id}/${parseInt(data_id) + 1}`)
            } else if (type === 'subcategory') {
                let dataNeedToEdit = await SubCategory.findById(id);
                let imageDataFieldName = `data.${data_id}.${field_name}`;
                let imageDataArray = dataNeedToEdit.data[data_id][field_name];
                imageDataArray.splice(image_entry, 1);

                let setArgument = {};
                setArgument[imageDataFieldName] = imageDataArray;

                const updatedCategory = await SubCategory.updateOne(
                    { _id: id },
                    { $set: setArgument },
                    { new: true }
                );


                req.flash('success', 'Image removed successfuly.');
                res.redirect(`/admin/category/details/images/album/subcategory/${id}/${parseInt(data_id) + 1}`)
            } else {

                req.flash('error', 'Wrong URL');
                res.redirect('/admin/dashboard')
            }
        } else {
            req.flash('error', 'Some Internal Error Occured..!');
            res.redirect('/admin/dashboard')
        }
    }
};
