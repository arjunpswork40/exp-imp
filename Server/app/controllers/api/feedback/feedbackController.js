const { makeJsonResponse } = require("../../../../utils/response");
const Feedback = require("../../../models/Feedback");
const { validateRequest } = require("../../../../requests/generateToken");

module.exports = {

    storeFeedback: async (req, res, next) => {


        let name = req.body.name;
        let comment = req.body.comment;

        const feedback = {
            name: name,
            feedback: comment,
        }
        console.log([req.body])
        await Feedback.create(feedback)
            .then((data) => {
                console.log(data);
                let response = makeJsonResponse(`Feedback created successfuly`, data, {}, 200, true);
                res.status(200).json(response);
            })
            .catch((err) => {
                console.log(err);
                let response = makeJsonResponse(`Some error occured.`, {}, err, 500, false);
                res.status(500).json(response);
            })
    },

    getAllFeedBacks: async (req, res, next) => {
        try {
            let pageNumber = req.body.pageNumber || 1;
            let pageSize = req.body.pageSize || 10;
            const feedbacks = await Feedback.find({
                status: 'accepted',
            })
                .select('name feedback createdAt')
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize);

            let response = makeJsonResponse(`Feedback list`, feedbacks, {}, 200, true);
            res.status(200).json(response);
        } catch (error) {
            console.log(err);
            let response = makeJsonResponse(`Some error occured.`, {}, err, 500, false);
            res.status(500).json(response);
        }
    }

}
