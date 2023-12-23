const { makeJsonResponse } = require("../../../../utils/response");
const Advertisement = require("../../../models/Advertisement");
const { Category, DataField } = require("../../../models/category/Category");
const path = require('path');
const { getDatafieldAndRulesFromCategory } = require('../../../../utils/category')

module.exports = {

    getHomeScreenDetails: async (req, res, next) => {

        let homeScreenDeatils = {
            advertisementDetails: []
        }

        let categoryPageNumber = req.body.categoryPageNumber || 1;
        let categoryPageSize = req.body.categoryPageSize || 10;
        // let advertisementPageNumber = req.body.advertisementPageNumber || 1;
        // let advertisementPageSize = req.body.advertisementPageSize || 10;


        try {

            const currentDate = new Date();
            currentDate.setUTCHours(0, 0, 0, 0)
            const advertisementDetails = await Advertisement.find({
                paymentStatus: true,
                deletedAt: null,
                expiryDate: { $gte: currentDate }
            })
                .select('filePath')
                .sort({ orderOfShow: 1 });

            const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
            const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv'];
            const advertisementDetailsWithFileUrl = advertisementDetails.map(val => {

                const filePath = val.filePath;
                const extension = path.extname(filePath).toLowerCase();
                let fileType = 'unknown';
                if (imageExtensions.includes(extension)) {
                    fileType = 'image';
                } else if (videoExtensions.includes(extension)) {
                    fileType = 'video';
                }

                const fileUrl = `${baseUrl}${(filePath !== '' && filePath !== null) ? filePath.replace('uploads', '') : ''}`;
                return {
                    ...val.toObject(),
                    fileUrl,
                    fileType
                };
            });


            let categories = await Category.find()
                .populate({
                    path: 'subcategories',
                    options: { sort: { name: 1 } }, // Sort the 'subcategories' array by 'name' in ascending order
                })
                .sort({ name: 1 })
                .skip((categoryPageNumber - 1) * categoryPageSize)
                .limit(categoryPageSize);
            const categoryCount = await Category.countDocuments();
            const totalPages = Math.ceil(categoryCount / categoryPageSize);
            // let finalResponse = await getDatafieldAndRulesFromCategory(categories);


            let recommendedCategories = await Category.find({ recommendedStatus: true }).sort({ name: 1 }).populate({
                path: 'subcategories',
                options: { sort: { name: 1 } }, // Sort the 'subcategories' array by 'name' in ascending order
            })
            // let finalrecommendedCategories = await getDatafieldAndRulesFromCategory(recommendedCategories);

            homeScreenDeatils.recommended = recommendedCategories;
            homeScreenDeatils.categoryPageNumber = categoryPageNumber;
            homeScreenDeatils.categoryPageSize = categories.length;
            // homeScreenDeatils.advertisementPageNumber = advertisementPageNumber;
            // homeScreenDeatils.advertisementPageSize = advertisementDetailsWithFileUrl.length;
            homeScreenDeatils.advertisementDetails = advertisementDetailsWithFileUrl;
            homeScreenDeatils.categoryCount = categoryCount;
            homeScreenDeatils.totalPages = totalPages;
            homeScreenDeatils.categories = categories;
            const response = makeJsonResponse('Home screen details', homeScreenDeatils, {}, 200, true);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            const response = makeJsonResponse('Some error occurred', {}, error, 500, false);
            res.status(500).json(response);
        }

    },
    searchCategory: async (req, res, next) => {

        try {
            let searchValue = req.body.search;

            let categories = await Category.find(
                {
                    name: {
                        $regex: searchValue,
                        $options: 'i'
                    }
                }
            )
                .sort({ name: 1 })
                .populate({
                    path: 'subcategories',
                    options: { sort: { name: 1 } }, // Sort the 'subcategories' array by 'name' in ascending order
                });

            console.log('categories==>', categories.length)
            const response = makeJsonResponse('Search result', { categories: categories }, {}, 200, true);
            res.status(200).json(response);

        } catch (error) {
            const response = makeJsonResponse('Internal error occured.', {}, { message: 'Internal error occured.' }, 500, false);
            res.status(500).json(response);
        }


    }
}