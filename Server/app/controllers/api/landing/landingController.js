const { default: mongoose } = require("mongoose");
const { makeJsonResponse } = require("../../../../utils/response");
const Africa = require("../../../models/continents/Africa");
const Asia = require("../../../models/continents/Asia");
const Australia = require("../../../models/continents/Australia");
const Europe = require("../../../models/continents/Europe");
const InstitutesInAfrica = require("../../../models/continents/InstituesInAfrica");
const InstitutesInAsia = require("../../../models/continents/InstituesInAsia");
const InstitutesInAustralia = require("../../../models/continents/InstituesInAustralia");
const InstitutesInEurope = require("../../../models/continents/InstituesInEurope");
const InstitutesInNorthAmerica = require("../../../models/continents/InstituesInNorthAmerica");
const InstitutesInSouthAmerica = require("../../../models/continents/InstituesInSouthAmerica");
const NorthAmerica = require("../../../models/continents/NorthAmerica");
const SouthAmerica = require("../../../models/continents/SouthAmerica");
const Enquery = require("../../../models/continents/Enquery");

let responseData = {
    message : 'Some Error Occured',
    data:[],
    error:[],
    httpStatusCode: 500,
    status: false
}

module.exports = {

    getInstitutesInAfrica: async (req, res, next) => {

        let homeScreenDeatils = {
            instituteDetails: []
        }

        let institutePageNumber = req.body.institutePageNumber || 1;
        let institutePageSize = req.body.institutePageSize || 10;

        try {


            let institutes = await InstitutesInAfrica.find()
                                    .sort({name: 1})
                                    .skip((institutePageNumber - 1) * institutePageSize)
                                    .limit(institutePageSize)
            const instituteCount = await InstitutesInAfrica.countDocuments();
            const totalPages = Math.ceil(instituteCount / institutePageSize);

            // let finalResponse = await getDatafieldAndRulesFromCategory(categories);


            homeScreenDeatils.institutePageNumber = institutePageNumber;
            homeScreenDeatils.institutePageSize = institutes.length;
            homeScreenDeatils.institutes = institutes;
            homeScreenDeatils.instituteCount = instituteCount;
            homeScreenDeatils.totalPages = totalPages;
            const response = makeJsonResponse('Home screen details', homeScreenDeatils, {}, 200, true);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            const response = makeJsonResponse('Some error occurred', {}, error, 500, false);
            res.status(500).json(response);
        }

    },
    getCountryByContitnet: async(req,res) => {
       
        let continent = req.params.continent
        try {
            let countries = [];
            let response;
            switch(continent) {
            case 'Africa' : 
                countries = await Africa.find().select("name")
                responseData.message = 'Contries in Africa.';
                break;
            case 'Asia' :
                countries = await Asia.find().select("name")
                responseData.message = 'Contries in Asia.';
                break;
            case 'Australia' :
                countries = await Australia.find().select("name")
                responseData.message = 'Contries in Australia.';
                break;
            case 'Europe' :
                countries = await Europe.find().select("name")
                responseData.message = 'Contries in Europe.';
                break;
            case 'NorthAmerica' :
                countries = await NorthAmerica.find().select("name")
                responseData.message = 'Contries in North America.';
               break;
            case 'SouthAmerica' :
                countries = await SouthAmerica.find().select("name")
                responseData.message = 'Contries in South America.';
                break;
            default :
                countries = await Africa.find().select("name")
                responseData.message = 'Contries in Africa.';
                break;
            }

           
            responseData.httpStatusCode = 200;
            responseData.success = true;
            responseData.data = countries;
            response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
            res.status(responseData.httpStatusCode).json(response);
        } catch (error) {
            console.log(error);
            const response = makeJsonResponse('Some error occurred', {}, error, 500, false);
            res.status(500).json(response);
        }
    },
    fetchInstituteDetailsByCountryIdAndContinent: async(req,res) => {
       console.log('pppppp')
        let continent = req.body.continent
        let countryIds = req.body.countryIds
        console.log(countryIds)
        try {
            let countries = [];
            let response;
            let conditionToexicute = (countryIds === 'all' || countryIds.includes('all') || countryIds.length === 0) ? {} : {countryId: {$in: countryIds}}
            console.log('conditionToexicute==>',conditionToexicute,countryIds === 'all' || countryIds.includes('all'))
            switch(continent) {
                case 'Africa' :
                countries = await InstitutesInAfrica.find(conditionToexicute).exec();
                responseData.message = 'Institues in Africa.';
                break;
            case 'Asia' :
                countries = await InstitutesInAsia.find(conditionToexicute).exec();
                responseData.message = 'Institues in Asia.';
                break;
            case 'Australia' :
                countries = await InstitutesInAustralia.find(conditionToexicute).exec();
                responseData.message = 'Institues in Australia.';
                break;
            case 'Europe' :
                countries = await InstitutesInEurope.find(conditionToexicute).exec();
                responseData.message = 'Institues in Europe.';
                break;
            case 'NorthAmerica' :
                countries = await InstitutesInNorthAmerica.find(conditionToexicute).exec();
                responseData.message = 'Institues in North America.';
               break;
            case 'SouthAmerica' :
                countries = await InstitutesInSouthAmerica.find(conditionToexicute).exec();
                responseData.message = 'Institues in South America.';
                break;
            default :
                countries = await InstitutesInAfrica.find(conditionToexicute).exec();
                responseData.message = 'Institues in Africa.';
                break;
            }

           
            responseData.httpStatusCode = 200;
            responseData.success = true;
            responseData.data = countries;
            response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
            res.status(responseData.httpStatusCode).json(response);
        } catch (error) {
            console.log(error);
            const response = makeJsonResponse('Some error occurred', {}, error, 500, false);
            res.status(500).json(response);
        }
    },
    getInstituteDetails: async(req,res) => {
        const continent = req.params.continent;
        let instituteId = req.params.instituteId;
        console.log(continent,instituteId)

        instituteId ? instituteId = mongoose.Types.ObjectId(instituteId) : instituteId
        console.log(continent,instituteId)

        try{
            let result = [];
            switch(continent) {
                case 'Africa' : 
                    result = await InstitutesInAfrica.findOne({_id:instituteId}).select('name description location areasOfStudy amenities teachersList shortName titleImage relatedDocuments relatedVideos relatedImages countryId').exec();
                    break;
                case 'Asia' :
                    result = await InstitutesInAsia.findOne({_id:instituteId}).select('name description location areasOfStudy amenities teachersList shortName titleImage relatedDocuments relatedVideos relatedImages countryId').exec();
                    break;
                case 'Australia' :
                    result = await InstitutesInAustralia.findOne({_id:instituteId}).select('name description location areasOfStudy amenities teachersList shortName titleImage relatedDocuments relatedVideos relatedImages countryId').exec();
                    break;
                case 'Europe' :
                    result = await InstitutesInEurope.findOne({_id:instituteId}).select('name description location areasOfStudy amenities teachersList shortName titleImage relatedDocuments relatedVideos relatedImages countryId').exec();
                    break;
                case 'NorthAmerica' :
                    result = await InstitutesInNorthAmerica.findOne({_id:instituteId}).select('name description location areasOfStudy amenities teachersList shortName titleImage relatedDocuments relatedVideos relatedImages countryId').exec();
                    break;
                case 'SouthAmerica' :
                    result = await InstitutesInSouthAmerica.findOne({_id:instituteId}).select('name description location areasOfStudy amenities teachersList shortName titleImage relatedDocuments relatedVideos relatedImages countryId').exec();
                    break;
                default:
                    result = await InstitutesInAfrica.findOne({_id:instituteId}).select('name description location areasOfStudy amenities teachersList shortName titleImage relatedDocuments relatedVideos relatedImages countryId').exec();
                    break;
            }

            let message = `Details about ${result?.shortName ?? 'given data is empty'}`
               
            responseData.httpStatusCode = 200;
            responseData.message = message
            responseData.success = true;
            responseData.data = result;
            console.log(result)
            response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
            res.status(responseData.httpStatusCode).json(response);
        } catch(error) {
            console.log(error);
            const response = makeJsonResponse('Some error occurred', {}, error, 500, false);
            res.status(500).json(response);
        }
    },

    storeEnquery: async(req,res,next) => {
        const details = req.body;
        let dataToStore = {
            name:details.name,
            email:details.email,
            phone:details.phone,
            message:details.message,
        }
        try{
            let institute;
            switch(details.continent){
                case 'Africa' : 
                     institute = await InstitutesInAfrica.findById(details.instituteId);
                    if(institute){
                        institute.enqueries.push(dataToStore);
                        await institute.save();
                        responseData.message='Enquery Stored successfuly';
                        responseData.httpStatusCode = 200
                        responseData.success = true
                        responseData.data = dataToStore;
                    } else {
                        responseData.message='Institute not found';
                        responseData.httpStatusCode = 200
                    }
                    break;
                case 'Asia' :
                     institute = await InstitutesInAsia.findById(details.instituteId);
                    if(institute){
                        institute.enqueries.push(dataToStore);
                        await institute.save();
                        responseData.message='Enquery Stored successfuly';
                        responseData.httpStatusCode = 200
                        responseData.success = true
                        responseData.data = dataToStore;
                    } else {
                        responseData.message='Institute not found';
                        responseData.httpStatusCode = 200
                    }
                    break;
                case 'Australia' :
                     institute = await InstitutesInAustralia.findById(details.instituteId);
                    if(institute){
                        institute.enqueries.push(dataToStore);
                        await institute.save();
                        responseData.message='Enquery Stored successfuly';
                        responseData.httpStatusCode = 200
                        responseData.success = true
                        responseData.data = dataToStore;
                    } else {
                        responseData.message='Institute not found';
                        responseData.httpStatusCode = 200
                    }
                    break;
                case 'Europe' :
                     institute = await InstitutesInEurope.findById(details.instituteId);
                    if(institute){
                        institute.enqueries.push(dataToStore);
                        await institute.save();
                        responseData.message='Enquery Stored successfuly';
                        responseData.httpStatusCode = 200
                        responseData.success = true
                        responseData.data = dataToStore;
                    } else {
                        responseData.message='Institute not found';
                        responseData.httpStatusCode = 200
                    }
                    break;
                case 'NorthAmerica' :
                     institute = await InstitutesInNorthAmerica.findById(details.instituteId);
                    if(institute){
                        institute.enqueries.push(dataToStore);
                        await institute.save();
                        responseData.message='Enquery Stored successfuly';
                        responseData.httpStatusCode = 200
                        responseData.success = true
                        responseData.data = dataToStore;
                    } else {
                        responseData.message='Institute not found';
                        responseData.httpStatusCode = 200
                    }
                    break;
                case 'SouthAmerica' :
                     institute = await InstitutesInSouthAmerica.findById(details.instituteId);
                    if(institute){
                        institute.enqueries.push(dataToStore);
                        await institute.save();
                        responseData.message='Enquery Stored successfuly';
                        responseData.httpStatusCode = 200
                        responseData.success = true
                        responseData.data = dataToStore;
                    } else {
                        responseData.message='Institute not found';
                        responseData.httpStatusCode = 200
                    }
                    break;
                default:
                     institute = await InstitutesInAfrica.findById(details.instituteId);
                    if(institute){
                        institute.enqueries.push(dataToStore);
                        await institute.save();
                        responseData.message='Enquery Stored successfuly';
                        responseData.httpStatusCode = 200
                        responseData.success = true
                        responseData.data = dataToStore;
                    } else {
                        responseData.message='Institute not found';
                        responseData.httpStatusCode = 200
                    }
                    break;
            }

          
            const response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
            res.status(responseData.httpStatusCode).json(response);
        } catch(error) {
            console.log(error);
            const response = makeJsonResponse('Some error occurred', {}, error, 500, false);
            res.status(500).json(response);
        }
    }

}
