const Advertisement = require("../../../models/Advertisement");
const { Category, SubCategory } = require("../../../models/category/Category");
const Feedback = require("../../../models/Feedback");
const User = require("../../../models/User");
const AppDetail = require("../../../models/AppDetail");
const { commonValues } = require('../baseController')
module.exports = {

    dashboard: async (req, res, next) => {

        let values = await commonValues(req);
        let categorydetails = [];
        let subCategorydetails = [];
        let advertisementDetailsForBox = [];
        let feedbackDetailsForBox = [];
        let contactUsDetails = {}
        let latestCategories = [];
        try {
            categorydetails = await Category.aggregate([
                {
                    $group: {
                        _id: null,
                        totalCategories: { $sum: 1 },
                        counts: {
                            $push: { category: "$name", dataCount: { $size: "$data" } }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        totalCategories: 1,
                        dataCounts: "$counts.dataCount"
                    }
                }
            ]);

            subCategorydetails = await SubCategory.aggregate([
                {
                    $group: {
                        _id: null,
                        totalCategories: { $sum: 1 },
                        counts: {
                            $push: { category: "$name", dataCount: { $size: "$data" } }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        totalCategories: 1,
                        dataCounts: "$counts.dataCount"
                    }
                }
            ]);

            advertisementDetailsForBox = await Advertisement.aggregate([
                {
                    $group: {
                        _id: null,
                        totalCount: { $sum: 1 },
                        paidCount: { $sum: { $cond: [{ $eq: ['$paymentStatus', true] }, 1, 0] } },
                        unpaidCount: { $sum: { $cond: [{ $eq: ['$paymentStatus', false] }, 1, 0] } }
                    }
                }
            ]);

            feedbackDetailsForBox = await Feedback.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: 1 },
                        rejected: { $sum: { $cond: [{ $eq: ['$status', 'rejected'] }, 1, 0] } },
                        accepted: { $sum: { $cond: [{ $eq: ['$status', 'accepted'] }, 1, 0] } },
                        pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } }
                    }
                }
            ]);

            latestCategories = await Category.aggregate([
                {
                    $project: {
                        name: 1,
                        image: 1,
                        dataCount: { $size: "$data" },
                        subcategoryCount: { $size: "$subcategories" },
                        createdAt: 1
                    }
                },
                { $sort: { createdAt: -1 } },
                { $limit: 10 },
                {
                    $group: {
                        _id: null,
                        totalCount: { $sum: 1 },
                        latestEntries: { $push: "$$ROOT" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        totalCount: 1,
                        latestEntries: 1
                    }
                }
            ]);

            contactUsDetails = await AppDetail.findOne({}).select('address digital_visiting_card instagaram_link facebook_link twiter_link whatsapp_number email')


        } catch (error) {
            console.log(error)
        }
        console.log(['***************************'])
        console.log(feedbackDetailsForBox[0], advertisementDetailsForBox[0])
        console.log(['***************************'])

        res.render("admin/dashboard/index", {
            title: "Admin Dashboard",
            layout: "admin/layout/main",
            pageTitle: 'Dashboard',
            totalCategories: categorydetails[0]?.totalCategories,
            categoryDataCount: categorydetails[0]?.dataCounts,
            totalSubCategories: subCategorydetails[0]?.totalCategories,
            subCategoryDataCount: subCategorydetails[0]?.dataCounts,
            advertisementTotalCount: advertisementDetailsForBox[0] ? advertisementDetailsForBox[0].totalCount : 0,
            advertisementBoxGraphData: [
                advertisementDetailsForBox[0] ? advertisementDetailsForBox[0].paidCount : 0,
                advertisementDetailsForBox[0] ? advertisementDetailsForBox[0].unpaidCount : 0,
            ],
            feedbackTotalCount: feedbackDetailsForBox[0] ? feedbackDetailsForBox[0].total : 0,
            feedbackBoxGraphData: [
                feedbackDetailsForBox[0] ? feedbackDetailsForBox[0].pending : 0,
                feedbackDetailsForBox[0] ? feedbackDetailsForBox[0].accepted : 0,
                feedbackDetailsForBox[0] ? feedbackDetailsForBox[0].rejected : 0,
            ],
            advertisementDetails: advertisementDetailsForBox,
            latestCategories: latestCategories[0] ? latestCategories[0].latestEntries : latestCategories,
            contactUsDetails: contactUsDetails,
            feedbackDetails: feedbackDetailsForBox,
            ...values
        });

    },




};
