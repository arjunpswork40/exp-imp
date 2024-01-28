const { makeJsonResponse } = require("../../../../../utils/response");

const fetchBasicDashBoardDetails = async (req, res, next) => {
    const response = makeJsonResponse('Hitted Succesfuly', { dummy:'Hello dashboard' }, {}, 200, true);
      return res.status(200).json(response);
};

module.exports =    { 
                        fetchBasicDashBoardDetails
                    };
