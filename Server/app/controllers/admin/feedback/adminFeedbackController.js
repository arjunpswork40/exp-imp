const User = require("../../../models/User");
const Feedback = require("../../../models/Feedback");
const { makeJsonResponse } = require("../../../../utils/response");
const { commonValues } = require("../baseController")

module.exports = {

    getFeedbacks: async (req, res, next) => {

        let feedbacks = await Feedback.find().sort({ createdAt: -1 });
        let values = await commonValues(req);
        let breadCrumbs = [
            {
                name: 'Home',
                url: '/admin/dashboard'
            },
            {
                name: 'Feedbacks',
                url: '#'
            },

        ];

        res.render("admin/feedback/index", {
            title: "Feedbacks",
            layout: "admin/layout/main",
            feedbacks: feedbacks,
            pageTitle: 'Feedbacks from user',
            breadCrumbs: breadCrumbs,
            ...values
        });

    },

    filterFeedbacks: (req, res, next) => {

        let filterStatus = req.body.filterStatus;
        let findConditions = {};

        if (filterStatus != 'all') {
            findConditions = { status: { $in: [filterStatus] } }
        }

        console.log(findConditions)

        let feedbacks = Feedback.find(findConditions).sort({ createdAt: -1 }).exec(function (err, docs) {
            if (err) {
                console.log(err);
                // req.flash('error', 'Some error occured.');
                response = makeJsonResponse("Some error occured.", {}, err, 500, false);
                res.status(500).json(response);
            } else {
                console.log(docs);
                // req.flash('success', `${filterStatus} feedbacks.`);
                response = makeJsonResponse(`${filterStatus} feedbacks.`, docs, {}, 200, true);
                res.status(200).json(response);
            }
        });
    },

    changeFeedbackStatus: (req, res, next) => {

        let status = req.body.status;
        let id = req.body.feedbackId;
        let currentFilter = req.body.currentFilterStatus;

        let updateFeedback = Feedback.findOneAndUpdate({ _id: id }, { status: status }, { new: true }, async (err, feedback) => {
            if (err) {
                console.error(err);
                response = makeJsonResponse("Some error occured.", {}, err, 500, false);
                res.status(200).json(response);
            } else {
                console.log(feedback);
            }
        });

        let findConditions = {};
        if (currentFilter != 'all') {
            findConditions = { status: { $in: [currentFilter] } }
        }

        let feedbacks = Feedback.find(findConditions).sort({ createdAt: -1 }).exec(function (err, docs) {
            if (err) {
                console.log(err);
                // req.flash('error', 'Some error occured.');
                response = makeJsonResponse("Some error occured.", {}, err, 500, false);
                res.status(200).json(response);
            } else {
                console.log(docs);
                // req.flash('success', `${filterStatus} feedbacks.`);
                response = makeJsonResponse(`${id} feedback were ${status}.`, docs, {}, 200, true, { currentFilter: currentFilter });
                res.status(200).json(response);
            }
        });
    },




};
