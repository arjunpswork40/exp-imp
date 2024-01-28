const { makeJsonResponse } = require("../../../../../utils/response");
const AppDetail = require("../../../../models/AppDetail");
const Africa = require("../../../../models/continents/Africa");
const Asia = require("../../../../models/continents/Asia");
const Australia = require("../../../../models/continents/Australia");
const Europe = require("../../../../models/continents/Europe");
const NorthAmerica = require("../../../../models/continents/NorthAmerica");
const SouthAmerica = require("../../../../models/continents/SouthAmerica");

module.exports = {

    getCountriesInAfrica: async (req, res, next) => {
        let responseData = {
            message : 'Data fetch failed',
            data:[],
            error:[],
            httpStatusCode: 500,
            status: false
        }
        try{
            let countries = await Africa.find({},'name');
            responseData.data = countries;
            responseData.status = true;
            responseData.httpStatusCode = 200;
            responseData.message = 'Countries fetched successfuly.'
        }catch(error){
            responseData.error = error;
        }
        const response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.status);
        return res.status(responseData.httpStatusCode).json(response);
    },
    getCountriesInAsia: async (req, res, next) => {
        let responseData = {
            message : 'Data fetch failed',
            data:[],
            error:[],
            httpStatusCode: 500,
            status: false
        }
        try{
            let countries = await Asia.find({},'name');
            responseData.data = countries;
            responseData.status = true;
            responseData.httpStatusCode = 200;
            responseData.message = 'Countries fetched successfuly.'
        }catch(error){
            responseData.error = error;
        }
        const response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.status);

        return res.status(responseData.httpStatusCode).json(response);
    },
    getCountriesInAustralia: async (req, res, next) => {
        let responseData = {
            message : 'Data fetch failed',
            data:[],
            error:[],
            httpStatusCode: 500,
            status: false
        }
        try{
            let countries = await Australia.find({},'name');
            responseData.data = countries;
            responseData.status = true;
            responseData.httpStatusCode = 200;
            responseData.message = 'Countries fetched successfuly.'
        }catch(error){
            responseData.error = error;
        }
        const response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.status);
        return res.status(responseData.httpStatusCode).json(response);
    },
    getCountriesInEurope: async (req, res, next) => {
        let responseData = {
            message : 'Data fetch failed',
            data:[],
            error:[],
            httpStatusCode: 500,
            status: false
        }
        try{
            let countries = await Europe.find({},'name');
            responseData.data = countries;
            responseData.status = true;
            responseData.httpStatusCode = 200;
            responseData.message = 'Countries fetched successfuly.'
        }catch(error){
            responseData.error = error;
        }
        const response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.status);
        return res.status(responseData.httpStatusCode).json(response);
    },
    getCountriesInNorthAmerica: async (req, res, next) => {
        let responseData = {
            message : 'Data fetch failed',
            data:[],
            error:[],
            httpStatusCode: 500,
            status: false
        }
        try{
            let countries = await NorthAmerica.find({},'name');
            responseData.data = countries;
            responseData.status = true;
            responseData.httpStatusCode = 200;
            responseData.message = 'Countries fetched successfuly.'
        }catch(error){
            responseData.error = error;
        }
        const response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.status);
        return res.status(responseData.httpStatusCode).json(response);
    },
    getCountriesInSouthAmerica: async (req, res, next) => {
        let responseData = {
            message : 'Data fetch failed',
            data:[],
            error:[],
            httpStatusCode: 500,
            status: false
        }
        try{
            let countries = await SouthAmerica.find({},'name');
            responseData.data = countries;
            responseData.status = true;
            responseData.httpStatusCode = 200;
            responseData.message = 'Countries fetched successfuly.'
        }catch(error){
            responseData.error = error;
        }
        const response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.status);
        return res.status(responseData.httpStatusCode).json(response);
    },

}
