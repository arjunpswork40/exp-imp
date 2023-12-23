const { makeJsonResponse } = require("../../../../utils/response");
const AppDetail = require("../../../models/AppDetail");

module.exports = {

    getAppDetails: async (req, res, next) => {


        let appData = await AppDetail.findOne()
            .then((appData) => {
                response = makeJsonResponse(`App details ( include privacy policy, terms and conditions and contact us details ).`, appData, {}, 200, true);
                res.status(200).json(response);
            })
            .catch((error) => {
                response = makeJsonResponse(`Some error occured.`, {}, error, 500, false);
                res.status(500).json(response);
            })


    },

}
