const { makeJsonResponse } = require("../../../../../utils/response");
const AppDetail = require("../../../../models/AppDetail");
const Africa = require("../../../../models/continents/Africa");
const Asia = require("../../../../models/continents/Asia");
const Australia = require("../../../../models/continents/Australia");
const Europe = require("../../../../models/continents/Europe");

const InstitutesInAfrica = require("../../../../models/continents/InstituesInAfrica");
const InstitutesInAsia = require("../../../../models/continents/InstituesInAsia");
const InstitutesInEurope = require("../../../../models/continents/InstituesInEurope");
const InstitutesInAustralia = require("../../../../models/continents/InstituesInAustralia");
const InstitutesInNorthAmerica = require("../../../../models/continents/InstituesInNorthAmerica");
const InstituesInSouthAmerica = require("../../../../models/continents/InstituesInSouthAmerica");

const fs = require('fs');
const path = require('path');
const NorthAmerica = require("../../../../models/continents/NorthAmerica");
const SouthAmerica = require("../../../../models/continents/SouthAmerica");
const mongoose = require('mongoose');

const { intituteDataFormatManager } = require('../../../../../utils/instituteStoreRequestDataManager')

let responseData = {
    message : 'Some Error Occured',
    data:[],
    error:[],
    httpStatusCode: 500,
    status: false
}

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
            let countries = await Africa.find({},'name imagePath');
            responseData.data = countries;
            responseData.success = true;
            responseData.httpStatusCode = 200;
            responseData.message = 'Countries fetched successfuly.'
        }catch(error){
            responseData.error = error;
        }
        const response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
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
            let countries = await Asia.find({},'name imagePath');
            responseData.data = countries;
            responseData.success = true;
            responseData.httpStatusCode = 200;
            responseData.message = 'Countries fetched successfuly.'
        }catch(error){
            responseData.error = error;
        }
        const response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);

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
            let countries = await Australia.find({},'name imagePath');
            responseData.data = countries;
            responseData.success = true;
            responseData.httpStatusCode = 200;
            responseData.message = 'Countries fetched successfuly.'
        }catch(error){
            responseData.error = error;
        }
        const response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
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
            let countries = await Europe.find({},'name imagePath');
            responseData.data = countries;
            responseData.success = true;
            responseData.httpStatusCode = 200;
            responseData.message = 'Countries fetched successfuly.'
        }catch(error){
            responseData.error = error;
        }
        const response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
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
            let countries = await NorthAmerica.find({},'name imagePath');
            responseData.data = countries;
            responseData.success = true;
            responseData.httpStatusCode = 200;
            responseData.message = 'Countries fetched successfuly.'
        }catch(error){
            responseData.error = error;
        }
        const response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
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
            let countries = await SouthAmerica.find({},'name imagePath');
            responseData.data = countries;
            responseData.success = true;
            responseData.httpStatusCode = 200;
            responseData.message = 'Countries fetched successfuly.'
        }catch(error){
            responseData.error = error;
        }
        const response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
        return res.status(responseData.httpStatusCode).json(response);
    },

    storeEducationalInstitutes: async(req,res) => {
        let { continent } = req.body;
        let docs = req.files;
        let dataTosStore = req.body;

        let finalDataForStore = await intituteDataFormatManager(dataTosStore,docs);
        console.log('finalDataForStore=>',finalDataForStore)
        console.log('req.bosy',req.body)
        try{
            let newInstitute;
            let storedDetails;
            switch(continent) {
                case 'Africa':
                    newInstitute = new InstitutesInAfrica(finalDataForStore)
                    break;
                case 'Asia' :
                    newInstitute = new InstitutesInAsia(finalDataForStore)
                    console.log('vvvv')

                    break;
                case 'Europe' :
                    newInstitute = new InstitutesInEurope(finalDataForStore)
            console.log(newInstitute)

                    break;
                case 'Australia' :
                    newInstitute = new InstitutesInAustralia(finalDataForStore)
                    console.log('dddd')

                    break;
                case 'NorthAmerica' :
                    newInstitute = new InstitutesInNorthAmerica(finalDataForStore)
                    break;
                case 'SouthAmerica' :
                    newInstitute = new InstituesInSouthAmerica(finalDataForStore)
                    break;
                default:
                    newInstitute = new InstitutesInAfrica(finalDataForStore)
                    break;

            }
            storedDetails = await newInstitute.save()
            console.log(storedDetails)

            responseData.message = 'Institute details stored succesfully';
            responseData.success = true;
            responseData.httpStatusCode = 200;
            responseData.data = storedDetails;
            console.log('ffffffffff')
            const response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
            return res.status(responseData.httpStatusCode).json(response);
        } catch(error){
            responseData.message = 'Institute details storing process failed';
            responseData.error = error;
            responseData.httpStatusCode = 500;
            console.log(error)
            const response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
            return res.status(responseData.httpStatusCode).json(response);
        }

    },
    fetchInstituteListByCountryId: async(req,res) => {
        let { continent,countryId } = req.params;

        if(mongoose.Types.ObjectId.isValid(countryId)) {
            try {
                let institutes,response;
                switch(continent) {
                    case 'Africa' :
                        institutes = await InstitutesInAfrica.find({countryId: countryId}).populate('countryId').exec();
                        responseData.message = 'Institutes in Africa.';
                        responseData.httpStatusCode = 200;
                        responseData.success = true;
                        responseData.data = institutes;
                        response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
                        return res.status(responseData.httpStatusCode).json(response);
                    case 'Asia' :
                        institutes = await InstitutesInAsia.find({countryId: countryId}).populate('countryId').exec();
                        responseData.message = 'Institutes in Asia.';
                        responseData.httpStatusCode = 200;
                        responseData.success = true;
                        responseData.data = institutes;
                        response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
                        return res.status(responseData.httpStatusCode).json(response);
                    case 'Australia' :
                        institutes = await InstitutesInAustralia.find({countryId: countryId}).populate('countryId').exec();
                        responseData.message = 'Institutes in Australia.';
                        responseData.httpStatusCode = 200;
                        responseData.success = true;
                        responseData.data = institutes;
                        response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
                        return res.status(responseData.httpStatusCode).json(response);
                    case 'Europe' :
                        institutes = await InstitutesInEurope.find({countryId: countryId}).populate('countryId').exec();
                        responseData.message = 'Institutes in Europe.';
                        responseData.httpStatusCode = 200;
                        responseData.success = true;
                        responseData.data = institutes;
                        response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
                        return res.status(responseData.httpStatusCode).json(response);
                    case 'NorthAmerica' :
                        institutes = await InstitutesInNorthAmerica.find({countryId: countryId}).populate('countryId').exec();
                        responseData.message = 'Institutes in NorthAmerica.';
                        responseData.httpStatusCode = 200;
                        responseData.success = true;
                        responseData.data = institutes;
                        response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
                        return res.status(responseData.httpStatusCode).json(response);
                    case 'SouthAmerica' :
                        institutes = await InstituesInSouthAmerica.find({countryId: countryId}).populate('countryId').exec();
                        responseData.message = 'Institutes in SouthAmerica.';
                        responseData.httpStatusCode = 200;
                        responseData.success = true;
                        responseData.data = institutes;
                        response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
                        return res.status(responseData.httpStatusCode).json(response);
                    default :
                        institutes = await InstitutesInAfrica.find({countryId: countryId}).populate('countryId').exec();
                        responseData.message = 'Institutes in Africa.';
                        responseData.httpStatusCode = 200;
                        responseData.success = true;
                        responseData.data = institutes;
                        response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
                        return res.status(responseData.httpStatusCode).json(response);
                }
    
            } catch(error) {
                responseData.httpStatusCode = 500;
                responseData.error = error;
                response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
                return res.status(responseData.httpStatusCode).json(response);
    
            }
        } else {
            responseData.httpStatusCode = 400;
            responseData.message = 'Validation error on Country Id'
            responseData.error = {
                param: 'CountryId',
                msg:'Not a valid Id'
            };
            response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
            return res.status(responseData.httpStatusCode).json(response);
        }
        
    },

    fetchInstituteDetailById: async(req,res) => {
        let { continent,instituteId } = req.params;

        if(mongoose.Types.ObjectId.isValid(instituteId)) {
            try {
                let institute,response;
                switch(continent) {
                    case 'Africa' :
                        institute = await InstitutesInAfrica.findOne({_id: instituteId}).populate('countryId').exec();
                        responseData.message = 'Institutes in Africa.';
                        responseData.httpStatusCode = 200;
                        responseData.success = true;
                        responseData.data = institute;
                        response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
                        return res.status(responseData.httpStatusCode).json(response);
                    case 'Asia' :
                        institute = await InstitutesInAsia.findOne({_id: instituteId}).populate('countryId').exec();
                        responseData.message = 'Institutes in Asia.';
                        responseData.httpStatusCode = 200;
                        responseData.success = true;
                        responseData.data = institute;
                        response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
                        return res.status(responseData.httpStatusCode).json(response);
                    case 'Australia' :
                        institute = await InstitutesInAustralia.findOne({_id: instituteId}).populate('countryId').exec();
                        responseData.message = 'Institutes in Australia.';
                        responseData.httpStatusCode = 200;
                        responseData.success = true;
                        responseData.data = institute;
                        response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
                        return res.status(responseData.httpStatusCode).json(response);
                    case 'Europe' :
                        institute = await InstitutesInEurope.findOne({_id: instituteId}).populate('countryId').exec();
                        responseData.message = 'Institutes in Europe.';
                        responseData.httpStatusCode = 200;
                        responseData.success = true;
                        responseData.data = institute;
                        response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
                        return res.status(responseData.httpStatusCode).json(response);
                    case 'NorthAmerica' :
                        institute = await InstitutesInNorthAmerica.findOne({_id: instituteId}).populate('countryId').exec();
                        responseData.message = 'Institutes in NorthAmerica.';
                        responseData.httpStatusCode = 200;
                        responseData.success = true;
                        responseData.data = institute;
                        response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
                        return res.status(responseData.httpStatusCode).json(response);
                    case 'SouthAmerica' :
                        institute = await InstituesInSouthAmerica.findOne({_id: instituteId}).populate('countryId').exec();
                        responseData.message = 'Institutes in SouthAmerica.';
                        responseData.httpStatusCode = 200;
                        responseData.success = true;
                        responseData.data = institute;
                        response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
                        return res.status(responseData.httpStatusCode).json(response);
                    default :
                        institute = await InstitutesInAfrica.findOne({_id: instituteId}).populate('countryId').exec();
                        responseData.message = 'Institutes in Africa.';
                        responseData.httpStatusCode = 200;
                        responseData.success = true;
                        responseData.data = institute;
                        response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
                        return res.status(responseData.httpStatusCode).json(response);
                }
    
            } catch(error) {
                responseData.httpStatusCode = 500;
                responseData.error = error;
                response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
                return res.status(responseData.httpStatusCode).json(response);
    
            }
        } else {
            responseData.httpStatusCode = 400;
            responseData.message = 'Validation error on Country Id'
            responseData.error = {
                param: 'CountryId',
                msg:'Not a valid Id'
            };
            response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
            return res.status(responseData.httpStatusCode).json(response);
        }
    },

    updateInstituteDetails: async(req,res ) => {
        let postData = req.body;
        let docs = req.files;
        console.log(docs)
        let finalDataForStore = await intituteDataFormatManager(postData,docs);
        let result = {...finalDataForStore}
        if(finalDataForStore.titleImage === '') {
            delete result['titleImage']
        }

        if(finalDataForStore.relatedDocuments.length === 0) {
            delete result['relatedDocuments']
        } else {
            if(finalDataForStore.relatedDocuments.length === 1) {
                if(finalDataForStore.relatedDocuments[0] === '') {
                    delete result['relatedDocuments']
                }
            }
        }

        if(finalDataForStore.relatedImages.length === 0) {
            delete result['relatedImages']
        } else{
            if(finalDataForStore.relatedDocuments.length === 1) {
                if(finalDataForStore.relatedImages[0] === ''){
                    delete result['relatedImages']
                }
            }
        } 

        if(finalDataForStore.relatedVideos.length === 0) {
                delete result['relatedVideos']
        }else{
            if(finalDataForStore.relatedImages.length === 1){
                if(finalDataForStore.relatedVideos[0] === '') {
                    delete result['relatedVideos']
                }
            }
        }

        if(mongoose.Types.ObjectId.isValid(postData.instituteId)) {
            try {
                let institute,response,preExistingData;
                switch(postData.continent) {
                    case 'Africa' :

                        preExistingData = await InstitutesInAfrica.findById(postData.instituteId)

                        if(preExistingData.relatedDocuments.length > 0) {
                            preExistingData.relatedDocuments = result.relatedDocuments ? preExistingData.relatedDocuments.concat(result.relatedDocuments) : preExistingData.relatedDocuments;
                        }
                        result.relatedDocuments = preExistingData.relatedDocuments;

                        if(preExistingData.relatedImages.length > 0) {
                            preExistingData.relatedImages = result.relatedImages ? preExistingData.relatedImages.concat(result.relatedImages) : preExistingData.relatedImages;
                        }
                        result.relatedImages = preExistingData.relatedImages;

                        if(preExistingData.relatedVideos.length > 0) {
                            preExistingData.relatedVideos = result.relatedVideos ? preExistingData.relatedVideos.concat(result.relatedVideos) : preExistingData.relatedVideos;
                        }
                        result.relatedVideos = preExistingData.relatedVideos;
                        institute = await InstitutesInAfrica.findByIdAndUpdate( postData.instituteId,result,{ new: true });
                        break;
                    case 'Asia' :
                        preExistingData = await InstitutesInAsia.findById(postData.instituteId)

                        if(preExistingData.relatedDocuments.length > 0) {
                            preExistingData.relatedDocuments = result.relatedDocuments ? preExistingData.relatedDocuments.concat(result.relatedDocuments) : preExistingData.relatedDocuments;
                        }
                        result.relatedDocuments = preExistingData.relatedDocuments;

                        if(preExistingData.relatedImages.length > 0) {
                            preExistingData.relatedImages = result.relatedImages ? preExistingData.relatedImages.concat(result.relatedImages) : preExistingData.relatedImages;
                        }
                        result.relatedImages = preExistingData.relatedImages;

                        if(preExistingData.relatedVideos.length > 0) {
                            preExistingData.relatedVideos = result.relatedVideos ? preExistingData.relatedVideos.concat(result.relatedVideos) : preExistingData.relatedVideos;
                        }
                        result.relatedVideos = preExistingData.relatedVideos;

                        institute = await InstitutesInAsia.findByIdAndUpdate( postData.instituteId,result,{ new: true });
                        break;
                    case 'Australia' :
                    
                        preExistingData = await InstitutesInAustralia.findById(postData.instituteId)

                        if(preExistingData.relatedDocuments.length > 0) {
                            preExistingData.relatedDocuments = result.relatedDocuments ? preExistingData.relatedDocuments.concat(result.relatedDocuments) : preExistingData.relatedDocuments;
                        }
                        result.relatedDocuments = preExistingData.relatedDocuments;

                        if(preExistingData.relatedImages.length > 0) {
                            preExistingData.relatedImages = result.relatedImages ? preExistingData.relatedImages.concat(result.relatedImages) : preExistingData.relatedImages;
                        }
                        result.relatedImages = preExistingData.relatedImages;

                        if(preExistingData.relatedVideos.length > 0) {
                            preExistingData.relatedVideos = result.relatedVideos ? preExistingData.relatedVideos.concat(result.relatedVideos) : preExistingData.relatedVideos;
                        }
                        result.relatedVideos = preExistingData.relatedVideos;

                        institute = await InstitutesInAustralia.findByIdAndUpdate( postData.instituteId,result,{ new: true });
                        break;
                    case 'Europe' :
                        
                        preExistingData = await InstitutesInEurope.findById(postData.instituteId)

                        if(preExistingData.relatedDocuments.length > 0) {
                            preExistingData.relatedDocuments = result.relatedDocuments ? preExistingData.relatedDocuments.concat(result.relatedDocuments) : preExistingData.relatedDocuments;
                        }
                        result.relatedDocuments = preExistingData.relatedDocuments;

                        if(preExistingData.relatedImages.length > 0) {
                            preExistingData.relatedImages = result.relatedImages ? preExistingData.relatedImages.concat(result.relatedImages) : preExistingData.relatedImages;
                        }
                        result.relatedImages = preExistingData.relatedImages;

                        if(preExistingData.relatedVideos.length > 0) {
                            preExistingData.relatedVideos = result.relatedVideos ? preExistingData.relatedVideos.concat(result.relatedVideos) : preExistingData.relatedVideos;
                        }
                        result.relatedVideos = preExistingData.relatedVideos;

                        institute = await InstitutesInEurope.findByIdAndUpdate( postData.instituteId,result,{ new: true });
                        break;
                    case 'NorthAmerica' :
                        
                        preExistingData = await InstitutesInNorthAmerica.findById(postData.instituteId)

                        if(preExistingData.relatedDocuments.length > 0) {
                            preExistingData.relatedDocuments = result.relatedDocuments ? preExistingData.relatedDocuments.concat(result.relatedDocuments) : preExistingData.relatedDocuments;
                        }
                        result.relatedDocuments = preExistingData.relatedDocuments;

                        if(preExistingData.relatedImages.length > 0) {
                            preExistingData.relatedImages = result.relatedImages ? preExistingData.relatedImages.concat(result.relatedImages) : preExistingData.relatedImages;
                        }
                        result.relatedImages = preExistingData.relatedImages;

                        if(preExistingData.relatedVideos.length > 0) {
                            preExistingData.relatedVideos = result.relatedVideos ? preExistingData.relatedVideos.concat(result.relatedVideos) : preExistingData.relatedVideos;
                        }
                        result.relatedVideos = preExistingData.relatedVideos;

                        institute = await InstitutesInNorthAmerica.findByIdAndUpdate( postData.instituteId,result,{ new: true });
                        break;
                    case 'SouthAmerica' :
                        
                        preExistingData = await InstituesInSouthAmerica.findById(postData.instituteId)

                        if(preExistingData.relatedDocuments.length > 0) {
                            preExistingData.relatedDocuments = result.relatedDocuments ? preExistingData.relatedDocuments.concat(result.relatedDocuments) : preExistingData.relatedDocuments;
                        }
                        result.relatedDocuments = preExistingData.relatedDocuments;

                        if(preExistingData.relatedImages.length > 0) {
                            preExistingData.relatedImages = result.relatedImages ? preExistingData.relatedImages.concat(result.relatedImages) : preExistingData.relatedImages;
                        }
                        result.relatedImages = preExistingData.relatedImages;

                        if(preExistingData.relatedVideos.length > 0) {
                            preExistingData.relatedVideos = result.relatedVideos ? preExistingData.relatedVideos.concat(result.relatedVideos) : preExistingData.relatedVideos;
                        }
                        result.relatedVideos = preExistingData.relatedVideos;

                        institute = await InstituesInSouthAmerica.findByIdAndUpdate( postData.instituteId,result,{ new: true });
                        break;
                    default :

                        preExistingData = await InstitutesInAfrica.findById(postData.instituteId)

                        if(preExistingData.relatedDocuments.length > 0) {
                            preExistingData.relatedDocuments = result.relatedDocuments ? preExistingData.relatedDocuments.concat(result.relatedDocuments) : preExistingData.relatedDocuments;
                        }
                        result.relatedDocuments = preExistingData.relatedDocuments;

                        if(preExistingData.relatedImages.length > 0) {
                            preExistingData.relatedImages = result.relatedImages ? preExistingData.relatedImages.concat(result.relatedImages) : preExistingData.relatedImages;
                        }
                        result.relatedImages = preExistingData.relatedImages;

                        if(preExistingData.relatedVideos.length > 0) {
                            preExistingData.relatedVideos = result.relatedVideos ? preExistingData.relatedVideos.concat(result.relatedVideos) : preExistingData.relatedVideos;
                        }
                        result.relatedVideos = preExistingData.relatedVideos;
                    
                        institute = await InstitutesInAfrica.findByIdAndUpdate( postData.instituteId,result,{ new: true });
                        break;
                }
    
                responseData.message = 'Institutes in Africa.';
                responseData.httpStatusCode = 200;
                responseData.success = true;
                responseData.data = institute;
                response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
                return res.status(responseData.httpStatusCode).json(response);
            } catch(error) {
                console.log(error)
                responseData.httpStatusCode = 500;
                responseData.error = error;
                response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
                return res.status(responseData.httpStatusCode).json(response);
    
            }
        } else {
            responseData.httpStatusCode = 400;
            responseData.message = 'Validation error on Country Id'
            responseData.error = {
                param: 'CountryId',
                msg:'Not a valid Id'
            };
            response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
            return res.status(responseData.httpStatusCode).json(response);
        }
    },
    removeFile: async(req,res,next) => {
        const {continent,instituteId,fileFieldname,fileName} = req.body;

        const parts = fileName.split('/');
        const fileNameWithExtension = parts[parts.length - 1];
        let realFileName = fileNameWithExtension;
        const baseDir = path.join(__dirname, '../../../../../'); 
        let filePath = path.join(baseDir, 'uploads/institute-documents', realFileName);
        console.log(filePath)
        try{
            let updatedArray;
            let valueFromDb;
            switch(continent) {
                case 'Africa' :
                    valueFromDb = await InstitutesInAfrica.findById(instituteId);
                    updatedArray = (fileFieldname === 'titleImage') ? valueFromDb.titleImage = '' : valueFromDb[fileFieldname].filter(item => item !== fileName);
                    if(fileFieldname === 'titleImage'){
                        await valueFromDb.save();
                    } else {
                        valueFromDb[fileFieldname] = updatedArray;
                        await valueFromDb.save();
                    }
                    break;
                case 'Asia' :
                    valueFromDb = await InstitutesInAsia.findById(instituteId);
                    updatedArray = (fileFieldname === 'titleImage') ? valueFromDb.titleImage = '' : valueFromDb[fileFieldname].filter(item => item !== fileName);
                    if(fileFieldname === 'titleImage'){
                        await valueFromDb.save();
                    } else {
                        valueFromDb[fileFieldname] = updatedArray;
                        await valueFromDb.save();
                    }
                    break;
                case 'Australia' :
                    valueFromDb = await InstitutesInAustralia.findById(instituteId);
                    updatedArray = (fileFieldname === 'titleImage') ? valueFromDb.titleImage = '' : valueFromDb[fileFieldname].filter(item => item !== fileName);
                    if(fileFieldname === 'titleImage'){
                        await valueFromDb.save();
                    } else {
                        valueFromDb[fileFieldname] = updatedArray;
                        await valueFromDb.save();
                    }
                    break;
                case 'Europe' :
                    valueFromDb = await InstitutesInEurope.findById(instituteId);
                    updatedArray = (fileFieldname === 'titleImage') ? valueFromDb.titleImage = '' : valueFromDb[fileFieldname].filter(item => item !== fileName);
                    if(fileFieldname === 'titleImage'){
                        await valueFromDb.save();
                    } else {
                        valueFromDb[fileFieldname] = updatedArray;
                        await valueFromDb.save();
                    }
                    break;
                case 'NorthAmerica':
                valueFromDb = await InstitutesInNorthAmerica.findById(instituteId);
                    updatedArray = (fileFieldname === 'titleImage') ? valueFromDb.titleImage = '' : valueFromDb[fileFieldname].filter(item => item !== fileName);
                    if(fileFieldname === 'titleImage'){
                        await valueFromDb.save();
                    } else {
                        valueFromDb[fileFieldname] = updatedArray;
                        await valueFromDb.save();
                    }
                    break;
                case 'SouthAmerica' :
                    valueFromDb = await InstituesInSouthAmerica.findById(instituteId);
                    updatedArray = (fileFieldname === 'titleImage') ? valueFromDb.titleImage = '' : valueFromDb[fileFieldname].filter(item => item !== fileName);
                    if(fileFieldname === 'titleImage'){
                        await valueFromDb.save();
                    } else {
                        valueFromDb[fileFieldname] = updatedArray;
                        await valueFromDb.save();
                    }
                    break;
                default:
                    valueFromDb = await InstitutesInAfrica.findById(instituteId);
                    updatedArray = (fileFieldname === 'titleImage') ? valueFromDb.titleImage = '' : valueFromDb[fileFieldname].filter(item => item !== fileName);
                    if(fileFieldname === 'titleImage'){
                        await valueFromDb.save();
                    } else {
                        valueFromDb[fileFieldname] = updatedArray;
                        await valueFromDb.save();
                    }
                    break;
            }
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            responseData.message = 'Institutes file details updated.';
            responseData.httpStatusCode = 200;
            responseData.success = true;
            responseData.data = valueFromDb;
            response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
            return res.status(responseData.httpStatusCode).json(response);
        } catch(error) {
            responseData.httpStatusCode = 500;
            responseData.error = error;
            response = makeJsonResponse(responseData.message,responseData.data,responseData.error,responseData.httpStatusCode,responseData.success);
            return res.status(responseData.httpStatusCode).json(response);
        }
    }

}
