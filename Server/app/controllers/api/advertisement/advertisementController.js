const { makeJsonResponse } = require("../../../../utils/response");
const Advertisement = require("../../../models/Advertisement");

module.exports = {

    storeAdvertisement: async (req, res, next) => {

        const file = req.file || req.files[0];
        let response = { success: false }
        let httpStatus = 500;
        const { name, comment, mobile_number } = req.body;
        const advertisement = new Advertisement({
            name: name,
            comment: comment,
            mobileNumber: mobile_number,
            filePath: file.path,
        });

        advertisement.save((err) => {
            if (err) {
                console.error(err);
                response = makeJsonResponse(`Advertisement data not stored. Some error occuured.`, {}, err, 500, false, {});
                httpStatus = 500;
            } else {
                response = makeJsonResponse(`Advertisement data stored successfuly.`, {
                    name: name,
                    comment: comment,
                    mobileNumber: mobile_number,
                    filePath: file,
                }, {}, 200, true, {});
                httpStatus = 200;
            }

            res.status(httpStatus).json(response);
        });

    },

}
