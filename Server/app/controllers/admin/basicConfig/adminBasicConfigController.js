const Admin = require("../../../models/Admin");
const { makeJsonResponse } = require('../../../../utils/response')
const { hashPassword } = require('../.././../../utils/auth');
const faker = require('faker');
const { ValidationRule, Category, DataField, SubCategory } = require("../../../models/category/Category");
const mongoose = require('mongoose');
const category = require("../../../../utils/category");
const Africa = require("../../../models/continents/Africa");
const Asia = require("../../../models/continents/Asia");
const Europe = require("../../../models/continents/Europe");
const NorthAmerica = require("../../../models/continents/NorthAmerica");
const SouthAmerica = require("../../../models/continents/SouthAmerica");
const Australia = require("../../../models/continents/Australia");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {

    createAdmin: async (req, res, next) => {
        let httpStatusCode = 500;
        let responseData = {};
        try {
            const newAdmin = await new Admin({
                name: 'Super Admin',
                email: 'admin@system.com',
                roles: ['super-admin']
            });
            let hashedPassword = await hashPassword('admin@123')

            if (hashedPassword.success) {
                newAdmin.password = hashedPassword.data.hashedValue;
                console.log(newAdmin)

                let admin = await newAdmin
                    .save()
                    .then(user => {
                        console.log(user)

                        let response = makeJsonResponse(hashedPassword);
                        return res.status(200).json(response);

                    })
                    .catch(err => {
                        console.log(err)
                        return makeJsonResponse(err);
                        let response = makeJsonResponse(err);
                        return res.status(200).json(response);
                    });


            } else {
                return makeJsonResponse(hashedPassword);
            }

        } catch (error) {
            return makeJsonResponse(error);

        }
    },
    createCountryEntry: async (req,res,next) => {
        let httpStatusCode = 500;
        let responseData = {};
        try {
            const africa = Africa.insertMany([
                {name:'Algeria', imagePath: process.env.BASE_URL+'/country_flags/Flag_of_Algeria.svg.png'},
                {name:'Angola', imagePath: process.env.BASE_URL+'/country_flags/Flag_of_Angola.svg.png'},
                {name:'Benin', imagePath: process.env.BASE_URL+'/country_flags/Flag_of_Benin.svg.png'},
                {name:'Botswana', imagePath: process.env.BASE_URL+'/country_flags/Flag_of_Botswana.svg.png'},
                {name:'Burkina Faso', imagePath: process.env.BASE_URL+'/country_flags/Flag_of_Burkina_Faso.svg.png'},
                {name:'Burundi', imagePath: process.env.BASE_URL+'/country_flags/Flag_of_Burundi.svg.png'},
                {name:'Cameroon', imagePath: process.env.BASE_URL+'/country_flags/Flag_of_Cameroon.svg.png'},
                {name:'Cape Verde', imagePath: process.env.BASE_URL+'/country_flags/Flag_of_Cape_Verde.svg.png'},
                {name:'Central African Republic', imagePath: process.env.BASE_URL+'/country_flags/Flag_of_the_Central_African_Republic.svg.png'},
                {name:'Chad', imagePath: process.env.BASE_URL+'/country_flags/Flag_of_Chad.svg.png'},
                {name:'Comoros', imagePath: process.env.BASE_URL+'/country_flags/Flag_of_the_Comoros.svg.png'},
                {name:'Democratic Congo', imagePath: process.env.BASE_URL+'/country_flags/Flag_of_the_Democratic_Republic_of_the_Congo.svg.png'},
                {name:'Congo', imagePath: process.env.BASE_URL+'/country_flags/Flag_of_the_Republic_of_the_Congo.svg.png'},
                {name:'Djibouti', imagePath: process.env.BASE_URL+'/country_flags/Flag_of_Djibouti.svg.png'},
                {name:'Egypt', imagePath: process.env.BASE_URL+'/country_flags/Flag_of_Egypt.svg.png'},
                {name:'Equatorial Guinea', imagePath: process.env.BASE_URL+'/country_flags/Flag_of_Equatorial_Guinea.svg.png'},
                {name:'Eritrea', imagePath: process.env.BASE_URL+'/country_flags/Flag_of_Eritrea.svg.png'},
                {name:'Eswatini', imagePath: process.env.BASE_URL+'/country_flags/Flag_of_Eswatini.svg.png'},
                {name:'Ethiopia', imagePath: process.env.BASE_URL+'/country_flags/Flag_of_Ethiopia.svg.png'},
                {name:'Gabon', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Gambia', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Ghana', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Guinea', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Guinea-Bissau', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Côte De Ivor', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Kenya', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Lesotho', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Liberia', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Libya', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Madagascar', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Malawi', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Mali', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Mauritania', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Mauritius', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Morocco', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Mozambique', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Namibia', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Niger', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Nigeria', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Rwanda', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'São Tomé and Príncipe', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Senegal', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Seychelles', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Sierra Leone', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Somalia', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'South Africa', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'South Sudan', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Sudan', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Tanzania', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Togo', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Tunisia', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Uganda', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Zambia', imagePath: process.env.BASE_URL+'/country_flags/'},
                {name:'Zimbabwe', imagePath: process.env.BASE_URL+'/country_flags/'},



            ])

            const asia = Asia.insertMany([
                {name:'Afghanistan'},
                {name:'Armenia'},
                {name:'Azerbaijan'},
                {name:'Bahrain'},
                {name:'Bangladesh'},
                {name:'Bhutan'},
                {name:'Brunei'},
                {name:'Cambodia'},
                {name:'China'},
                {name:'Cyprus'},
                {name:'East Timor'},
                {name:'Georgia'},
                {name:'India'},
                {name:'Indonesia'},
                {name:'Iran'},
                {name:'Iraq'},
                {name:'Israel'},
                {name:'Japan'},
                {name:'Jordan'},
                {name:'Kazakhstan'},
                {name:'North Korea'},
                {name:'South Korea'},
                {name:'Kuwait'},
                {name:'Kyrgyzstan'},
                {name:'Laos'},
                {name:'Lebanon'},
                {name:'Malaysia'},
                {name:'Maldives'},
                {name:'Mongolia'},
                {name:'Myanmar'},
                {name:'Nepal'},
                {name:'Oman'},
                {name:'Pakistan'},
                {name:'Palestine'},
                {name:'Philippines'},
                {name:'Qatar'},
                {name:'Saudi Arabia'},
                {name:'Singapore'},
                {name:'Sri Lanka'},
                {name:'Syria'},
                {name:'Tajikistan'},
                {name:'Taiwan'},
                {name:'Thailand'},
                {name:'Turkey'},
                {name:'Turkmenistan'},
                {name:'United Arab Emirates'},
                {name:'Uzbekistan'},
                {name:'Vietnam'},
                {name:'Yemen'},
            ])

            const europe = Europe.insertMany([
                {name:'Albania'},
                {name:'Andorra'},
                {name:'Austria'},
                {name:'Belarus'},
                {name:'Belgium'},
                {name:'Bosnia and Herzegovina'},
                {name:'Bulgaria'},
                {name:'Croatia'},
                {name:'Czechia'},
                {name:'Denmark'},
                {name:'Estonia'},
                {name:'Finland'},
                {name:'France'},
                {name:'Germany'},
                {name:'Greece'},
                {name:'Hungary'},
                {name:'Iceland'},
                {name:'Ireland'},
                {name:'Italy'},
                {name:'Kosovo'},
                {name:'Latvia'},
                {name:'Liechtenstein'},
                {name:'Lithuania'},
                {name:'Luxembourg'},
                {name:'Malta'},
                {name:'Moldova'},
                {name:'Monaco'},
                {name:'Montenegro'},
                {name:'Netherlands'},
                {name:'North Macedonia'},
                {name:'Norway'},
                {name:'Poland'},
                {name:'Portugal'},
                {name:'Romania'},
                {name:'Russia'},
                {name:'San Marino'},
                {name:'Serbia'},
                {name:'Slovakia'},
                {name:'Slovenia'},
                {name:'Spain'},
                {name:'Sweden'},
                {name:'Switzerland'},
                {name:'Ukraine'},
                {name:'United Kingdom'},
                {name:'Vatican City'},
            ])

            const northAmerica = NorthAmerica.insertMany([
                {name:'Antigua and Barbuda'},
                {name:'The Bahamas'},
                {name:'Barbados'},
                {name:'Belize'},
                {name:'Canada'},
                {name:'Costa Rica'},
                {name:'Cuba'},
                {name:'Dominica'},
                {name:'Dominican Republic'},
                {name:'El Salvador'},
                {name:'Grenada'},
                {name:'Guatemala'},
                {name:'Haiti'},
                {name:'Honduras'},
                {name:'Jamaica'},
                {name:'Mexico'},
                {name:'Nicaragua'},
                {name:'Panama'},
                {name:'Saint Kitts and Nevis'},
                {name:'Saint Lucia'},
                {name:'Saint Vincent and the Grenadines'},
                {name:'United States'},
            ])

            const southAmerica = SouthAmerica.insertMany([
                {name:'Argentina'},
                {name:'Bolivia'},
                {name:'Brazil'},
                {name:'Chile'},
                {name:'Colombia'},
                {name:'Ecuador'},
                {name:'Guyana'},
                {name:'Paraguay'},
                {name:'Peru'},
                {name:'Suriname'},
                {name:'Trinidad and Tobago'},
                {name:'Uruguay'},
                {name:'Venezuela'},
            ])

            const australia = Australia.insertMany([
                {name:'Australia'},
                {name:'Cook Islands'},
                {name:'Federated States of Micronesia'},
                {name:'Fiji'},
                {name:'Kiribati'},
                {name:'Marshall Islands'},
                {name:'Nauru'},
                {name:'New Zealand'},
                {name:'Niue'},
                {name:'Palau'},
                {name:'Papua New Guinea'},
                {name:'Samoa'},
                {name:'Solomon Islands'},
                {name:'Tonga'},
                {name:'Tuvalu'},
                {name:'Vanuatu'},

            ])

            return res.status(200).json(response);


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
