const { makeJsonResponse } = require("../../../../../utils/response");

const InstitutesInAfrica = require("../../../../models/continents/InstituesInAfrica");
const InstitutesInAsia = require("../../../../models/continents/InstituesInAsia");
const InstitutesInAustralia = require("../../../../models/continents/InstituesInAustralia");
const InstitutesInEurope = require("../../../../models/continents/InstituesInEurope");
const InstitutesInNorthAmerica = require("../../../../models/continents/InstituesInNorthAmerica");
const InstitutesInSouthAmerica = require("../../../../models/continents/InstituesInSouthAmerica");

let responseData = {
    message : 'Some Error Occured',
    data:[],
    error:[],
    httpStatusCode: 500,
    status: false
}


module.exports = {

    getEnqueriesUnderInstitute: async (req, res, next) => {
        const {continent} = req.params
        console.log('continent=>',continent)
        try{
            if(continent){
                let enqueries;
                switch(continent){
                    case 'Africa' :
                        enqueries = await InstitutesInAfrica.find({
                            enqueries: { $exists: true, $not: { $size: 0 } }
                        }).select('name countryId enqueries').populate('countryId','name');
                        responseData.data = enqueries;
                        break;
                    case 'Asia' :
                        enqueries = await InstitutesInAsia.find({
                            enqueries: { $exists: true, $not: { $size: 0 } }
                        }).select('name countryId enqueries').populate('countryId','name');;
                        responseData.data = enqueries;
                        break;
                    case 'Australia' :
                        enqueries = await InstitutesInAustralia.find({
                            enqueries: { $exists: true, $not: { $size: 0 } }
                        }).select('name countryId enqueries').populate('countryId','name');;
                        responseData.data = enqueries;
                        break;
                    case 'Europe' :
                        enqueries = await InstitutesInEurope.find({
                            enqueries: { $exists: true, $not: { $size: 0 } }
                        }).select('name countryId enqueries').populate('countryId','name');;
                        responseData.data = enqueries;
                        break;
                    case 'NorthAmerica' :
                        enqueries = await InstitutesInNorthAmerica.find({
                            enqueries: { $exists: true, $not: { $size: 0 } }
                        }).select('name countryId enqueries').populate('countryId','name');;
                        responseData.data = enqueries;
                        break;
                    case 'SouthAmerica' :
                        enqueries = await InstitutesInSouthAmerica.find({
                            enqueries: { $exists: true, $not: { $size: 0 } }
                        }).select('name countryId enqueries').populate('countryId','name');;
                        responseData.data = enqueries;
                        break;
                    default:
                        enqueries = await InstitutesInAfrica.find({
                            enqueries: { $exists: true, $not: { $size: 0 } }
                        }).select('name countryId enqueries').populate('countryId','name');;
                        responseData.data = enqueries;
                        break;
                }
            }
            responseData.success = true;
            responseData.httpStatusCode = 200;
            responseData.message = 'Enqueries fetched successfuly.'
        }catch(error){
            console.log(error)
            responseData.error = error;
        }
        const response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
        return res.status(responseData.httpStatusCode).json(response);
    },

    getEnqueryDetails: async(req,res,next) => {
        const { continent, instituteId } = req.params;
        try{
            let result;
            switch(continent){
                case 'Africa' :
                    result = await InstitutesInAfrica.findById(instituteId,'name email phone enqueries');
                    break;
                case 'Asia' :
                    result = await InstitutesInAsia.findById(instituteId,'name email phone enqueries');
                    break;
                case 'Australia' :
                    result = await InstitutesInAustralia.findById(instituteId,'name email phone enqueries');
                    break;
                case 'Europe' :
                    result = await InstitutesInEurope.findById(instituteId,'name email phone enqueries');
                    break;
                case 'NorthAmerica' :
                    result = await InstitutesInNorthAmerica.findById(instituteId,'name email phone enqueries');
                    break;
                case 'SouthAmerica' :
                    result = await InstitutesInSouthAmerica.findById(instituteId,'name email phone enqueries');
                    break;
                default:
                    result = await InstitutesInAfrica.findById(instituteId,'name email phone enqueries');
                    break;
            }
            responseData.httpStatusCode = 200;
            responseData.message = 'Enquery details fetched successfully';
            responseData.data = result;
        }catch(error){
            console.log(error)
            responseData.error = error;
        }
        const response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
        return res.status(responseData.httpStatusCode).json(response);
    }


}
