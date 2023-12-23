const User = require("../../../models/User");
const { makeJsonResponse } = require('../../../../utils/response')
const { hashPassword } = require('../.././../../utils/auth');
const faker = require('faker');
const { ValidationRule, Category, DataField, SubCategory } = require("../../../models/category/Category");
const mongoose = require('mongoose');
const category = require("../../../../utils/category");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {

    createAdmin: async (req, res, next) => {
        let httpStatusCode = 500;
        let responseData = {};
        try {
            const newUser = await new User({
                name: 'Super Admin',
                email: 'admin@system.com',
                role: ['super-admin']
            });

            let hashedPassword = await hashPassword('admin@123')

            if (hashedPassword.success) {
                newUser.password = hashedPassword.data.hashedValue;

                let admin = await newUser
                    .save()
                    .then(user => {

                        res.redirect('/admin/login')

                    })
                    .catch(err => {
                        res.redirect('/admin/login')
                    });


            } else {
                return makeJsonResponse(hashedPassword);
            }

        } catch (error) {
            return makeJsonResponse(error);

        }
    },

    oneTimeProcessForDataTypeAndNameInsertionOnCategory: async (req, res, next) => {
        let categories = await Category.find();
        let subcategories = await SubCategory.find();
        for (let category of categories) {
            let dataFieldsAndTypeArray = [];
            let validationRules = await DataField.find({ category: mongoose.Types.ObjectId(category._id) }).populate('validationRule');
            for (let validationRule of validationRules) {
                dataFieldsAndTypeArray.push({
                    name: validationRule.name,
                    rule: validationRule?.validationRule?.rule
                })
            }
            await Category.findByIdAndUpdate(category._id, {
                dataFieldsAndType: dataFieldsAndTypeArray
            })
        }
        for (let subCategory of subcategories) {
            let dataFieldsAndTypeArray = [];
            let validationRules = await DataField.find({ subCategory: mongoose.Types.ObjectId(subCategory._id) }).populate('validationRule');
            for (let validationRule of validationRules) {
                dataFieldsAndTypeArray.push({
                    name: validationRule.name,
                    rule: validationRule?.validationRule?.rule
                })
            }
            await SubCategory.findByIdAndUpdate(subCategory._id, {
                dataFieldsAndType: dataFieldsAndTypeArray
            })
        }

        return 'success!';
    },

    insertBulkTestDataToDB: async (req, res, next) => {
        const data = [];

        let validationRules = await ValidationRule.find();
        let ruleArrayLength = validationRules.length;
        let imagesEntry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        for (let i = 0; i < 100; i++) {

            if (i <= 50) {
                const categoryName = faker.name.firstName();
                const imageRandomEntry = Math.floor(Math.random() * imagesEntry.length)
                const randomImgEntry = imagesEntry[imageRandomEntry];
                const categoryImage = '/category/image' + randomImgEntry + '.jpeg';

                const categoryData = {
                    name: categoryName,
                    have_data: true,
                    image: categoryImage,
                }

                const category = await Category.create(categoryData);

                let checkImage = [];
                for (let i = 0; i < 4; i++) {

                    if (!checkImage.includes('Image')) {
                        const fieldName = faker.name.firstName();
                        const randomIndex = Math.floor(Math.random() * validationRules.length);
                        const randomlySelectedEntry = validationRules[randomIndex];
                        const validationRule = randomlySelectedEntry._id;

                        const dataFieldValus = {
                            name: fieldName,
                            validationRule: validationRule,
                            isCategory: true,
                            category: category._id
                        };
                        checkImage.push(randomlySelectedEntry.rule)
                        const dataField = await DataField.create(dataFieldValus);
                        console.log([`##${i} th category created with have_data true`])
                    }


                }
            } else {
                const categoryName = faker.name.firstName();
                const imageRandomEntry = Math.floor(Math.random() * imagesEntry.length)
                const randomImgEntry = imagesEntry[imageRandomEntry];
                const categoryImage = '/category/image' + randomImgEntry + '.jpeg';

                const categoryData = {
                    name: categoryName,
                    have_data: false,
                    image: categoryImage,
                }

                const category = await Category.create(categoryData);
                console.log([`**${i} th category created with have_data false`])

                for (let i = 0; i < 10; i++) {


                    const subCategoryName = faker.name.firstName();
                    const imageRandomEntrysubCat = Math.floor(Math.random() * imagesEntry.length)
                    const randomImgEntrySubCat = imagesEntry[imageRandomEntrysubCat];
                    const subCategoryImage = '/subcategory/image' + randomImgEntrySubCat + '.jpeg';

                    const SubCategoryData = {
                        name: subCategoryName,
                        image: subCategoryImage,
                        have_data: true,
                        category: category._id
                    }

                    const subcategory = await SubCategory.create(SubCategoryData);

                    let categoryData = await Category.findByIdAndUpdate(
                        new ObjectId(category._id),
                        {
                            $push: {
                                subcategories: subcategory._id
                            }
                        },
                        { new: true }
                    )
                    let checkImage = [];

                    for (let i = 0; i < 4; i++) {

                        if (!checkImage.includes('Image')) {

                            const fieldName = faker.name.firstName();
                            const randomIndex = Math.floor(Math.random() * validationRules.length);
                            const randomlySelectedEntry = validationRules[randomIndex];
                            const validationRule = randomlySelectedEntry._id;

                            const dataFieldValussub = {
                                name: fieldName,
                                validationRule: validationRule,
                                isCategory: false,
                                subCategory: subcategory._id
                            };

                            console.log(['*/*/*/*/*/*/*/*/*/****/*/**/*/'])
                            console.log(dataFieldValussub)
                            console.log(['*/*/*/*/*/*/*/*/*/****/*/**/*/'])


                            const dataField = await DataField.create(dataFieldValussub);
                            console.log([`<<>>${i} th sub_category created with have_data true`])
                        }
                    }
                }
            }



        }

        console.log(['#####################################################'])
        console.log(['<<<<<>>>>>>----- COMPLETED -------<<<<<<>>>'])
        console.log(['#####################################################'])
        return { success: 'Yesss!!!!' }

    },

    insertDataToCategoryAndSubCategory: async (req, res, next) => {

        let categories = await Category.find().populate('subcategories');
        let imagesEntry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

        for (let category of categories) {
            if (category.have_data) {
                let datafields = await DataField.find({ category: category._id }).populate('validationRule');
                let fieldWithValues = {};
                for (let i = 0; i < 50; i++) {

                    for (let field of datafields) {
                        let rule = field.validationRule.rule;
                        if (rule === 'Image') {
                            const imageRandomEntrysubCat = Math.floor(Math.random() * imagesEntry.length)
                            const randomImgEntrySubCat = imagesEntry[imageRandomEntrysubCat];
                            const subCategoryImage = '/category-subcategory-images/image' + randomImgEntrySubCat + '.jpeg';
                            fieldWithValues[field.name] = subCategoryImage;
                        } else if (rule === 'Description') {
                            fieldWithValues[field.name] = faker.lorem.paragraph();
                        } else if (rule === 'Mobile' || rule === 'Whatsapp') {
                            fieldWithValues[field.name] = faker.phone.phoneNumber();
                        } else if (rule === 'Linkedin' || rule === 'Instagram' || rule === 'Facebook') {
                            fieldWithValues[field.name] = faker.internet.url();
                        } else {
                            fieldWithValues[field.name] = faker.name.findName();
                        }



                    }
                    console.log(['++++++++++++======='])
                    console.log(fieldWithValues);
                    console.log(['++++++++++++======='])
                    let categoryData = await Category.findByIdAndUpdate(
                        ObjectId(category._id),
                        {
                            $push: {
                                data: fieldWithValues
                            }
                        },
                        { new: true }
                    )
                }


            } else {

                let subcategories = category.subcategories;

                for (let subCategory of subcategories) {
                    let datafields = await DataField.find({ subCategory: subCategory._id }).populate('validationRule');
                    let fieldWithValues = {};
                    for (let i = 0; i < 50; i++) {

                        for (let field of datafields) {
                            let rule = field.validationRule.rule;
                            if (rule === 'Image') {
                                const imageRandomEntrysubCat = Math.floor(Math.random() * imagesEntry.length)
                                const randomImgEntrySubCat = imagesEntry[imageRandomEntrysubCat];
                                const subCategoryImage = '/category-subcategory-images/image' + randomImgEntrySubCat + '.jpeg';
                                fieldWithValues[field.name] = subCategoryImage;
                            } else if (rule === 'Description') {
                                fieldWithValues[field.name] = faker.lorem.paragraph();
                            } else if (rule === 'Mobile' || rule === 'Whatsapp') {
                                fieldWithValues[field.name] = faker.phone.phoneNumber();
                            } else if (rule === 'Linkedin' || rule === 'Instagram' || rule === 'Facebook') {
                                fieldWithValues[field.name] = faker.internet.url();
                            } else {
                                fieldWithValues[field.name] = faker.name.findName();
                            }



                        }
                        console.log(['++++++++++++======='])
                        console.log(fieldWithValues);
                        console.log(['++++++++++++======='])
                        let categoryData = await SubCategory.findByIdAndUpdate(
                            ObjectId(subCategory._id),
                            {
                                $push: {
                                    data: fieldWithValues
                                }
                            },
                            { new: true }
                        )
                    }
                }
            }
        }

        console.log(['#####################################################'])
        console.log(['****************>< COMPLETED <>*********************'])
        console.log(['#####################################################'])

    }




};
