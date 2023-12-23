const User = require("../../../models/User");
const Feedback = require("../../../models/Feedback");
const { makeJsonResponse } = require("../../../../utils/response");
const Advertisement = require("../../../models/Advertisement");
const sizeOf = require('image-size');
const ffprobe = require('ffprobe');
const ffprobeStatic = require('ffprobe-static');
const fs = require('fs');
const path = require('path')
const { commonValues } = require("../baseController")

module.exports = {

    getAdvertisement: async (req, res, next) => {

        let advertisements = await Advertisement.find({ deletedAt: null }).sort({ createdAt: -1 });

        let breadCrumbs = [
            {
                name: 'Home',
                url: '/admin/dashboard'
            },
            {
                name: 'Advertisement',
                url: '#'
            },

        ];
        let values = await commonValues(req);

        res.render("admin/advertisement/index", {
            title: "Advertisement",
            layout: "admin/layout/main",
            advertisements: advertisements,
            pageTitle: 'Advertisement from user',
            breadCrumbs: breadCrumbs,
            ...values
        });

    },

    viewAdvertisement: async (req, res, next) => {

        let advertisement = await Advertisement.findOne({ _id: req.params.id });
        let orderOfShows = await Advertisement.find({
            deletedAt: null,
            paymentStatus: true,
            orderOfShow: { $gt: 0 }
        }).select('orderOfShow');


        let orders = [];

        orderOfShows.map(order => {
            orders.push(order.orderOfShow)
        })

        let highestNumber = Math.max(...orders);
        let newOrderArray = [];

        if (orders.length > 0) {
            for (let i = 1; i <= highestNumber + 5; i++) {
                if (!orders.includes(i)) {
                    newOrderArray.push(i);
                }
            }
        } else {
            for (let i = 1; i <= 5; i++) {
                if (!orders.includes(i)) {
                    newOrderArray.push(i);
                }
            }
        }

        newOrderArray.sort((a, b) => a - b);
        console.log(orderOfShows, newOrderArray)

        advertisement.fileName = advertisement.filePath.replace('uploads/advertisement/', ' ');
        advertisement.filePath = advertisement.filePath.replace('uploads', '');
        const originalDate = new Date(advertisement.expiryDate);
        const year = originalDate.getFullYear();
        const month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
        const day = ('0' + originalDate.getDate()).slice(-2);

        const formattedDate = `${year}-${month}-${day}`;
        let values = await commonValues(req);

        let fileData = [];
        const filePath = path.join(__dirname, '..', '..', '..', '..', 'uploads', advertisement.filePath);
        if (fs.existsSync(filePath)) {
            const fileStats = fs.statSync(filePath);
            if (advertisement.filePath.endsWith('.jpg') || advertisement.filePath.endsWith('.png') || advertisement.filePath.endsWith('.jpeg') || advertisement.filePath.endsWith('.svg')) {
                const dimensions = sizeOf(filePath);
                fileData.name = advertisement.fileName;
                fileData.height = dimensions.height;
                fileData.width = dimensions.width;
                // fileData.size = fileStats.size;
            } else if (filePath.endsWith('.mp4')) {
                let videoFile = await ffprobe(filePath, { path: ffprobeStatic.path });
                const { width, height, size } = videoFile.streams[0];
                fileData.name = advertisement.fileName;
                fileData.height = height;
                fileData.width = width;
            }
        }

        let breadCrumbs = [
            {
                name: 'Home',
                url: '/admin/dashboard'
            },
            {
                name: 'Advertisement',
                url: '/admin/advertisements'
            },
            {
                name: 'View',
                url: '#'
            }
        ];
        console.log(advertisement);
        res.render("admin/advertisement/view", {
            title: 'Advertisement from user',
            layout: "admin/layout/main",
            advertisement: advertisement,
            pageTitle: `Advertisement from ${advertisement.name}`,
            fileData: fileData,
            breadCrumbs: breadCrumbs,
            expiryDate: formattedDate,
            orderArray: newOrderArray,
            ...values
        });
    },

    filterAdvertisement: async (req, res, next) => {
        let filterStatus = req.body.filterStatus;
        let findConditions = {};

        if (filterStatus != 'all') {
            findConditions = { deletedAt: null, paymentStatus: { $in: [filterStatus] } }
        } else {
            findConditions = { deletedAt: null }
        }

        try {
            let advertisements = await Advertisement.find(findConditions).sort({ createdAt: -1 });
            response = makeJsonResponse(`${(filterStatus === 'all') ? 'All' : ((filterStatus === 'true') ? 'Paid' : 'Unpaid')} advertisements.`, advertisements, {}, 200, true);
            res.status(200).json(response);
        } catch (error) {
            response = makeJsonResponse("Some error occured.", {}, err, 500, false);
            res.status(500).json(response);
        }
    },

    changePaymentStatus: (req, res, next) => {

        let id = req.body.advertisementId;
        let currentStatus = req.body.currentStatus;
        let expiryDate = req.body.expiryDate;
        let orderOfShow = req.body.orderOfShow;
        // let duration = req.body.duration;

        let status = (currentStatus === 'paid') ? false : true;
        let dataToInsert = {
            paymentStatus: status,
        }
        if (currentStatus === 'unpaid') {
            console.log(orderOfShow)
            console.log(['=========='])
            dataToInsert.expiryDate = new Date(expiryDate),
                (orderOfShow != '') ? dataToInsert.orderOfShow = orderOfShow : ''
            // dataToInsert.duration = duration
        }

        let updateAdvertisement = Advertisement.findOneAndUpdate({ _id: id }, dataToInsert, { new: true }, async (err, advertisement) => {
            if (err) {
                console.error(err);
                response = makeJsonResponse("Some error occured.", {}, err, 500, false);
                res.status(200).json(response);
            } else {
                console.log(advertisement);
                response = makeJsonResponse(
                    `Payment status for "${advertisement.name}" were changed to ${(advertisement.paymentStatus) ? 'Paid' : 'unpaid'}.`,
                    advertisement,
                    {},
                    200,
                    true,
                    { status: status }
                );
                res.status(200).json(response);
            }
        });
    },

    deleteAdvertisement: async (req, res, next) => {

        let addsId = req.body.addsId;
        let currentFilterStatus = req.body.currentFilterStatus;


        let finOption = {
            deletedAt: null,
        }

        if (currentFilterStatus != 'all') {
            console.log('ffff')
            finOption.paymentStatus = currentFilterStatus
        }

        console.log(finOption);
        console.log(currentFilterStatus);

        try {
            let currentDate = new Date();
            let updateAdvertisement = await Advertisement.findOneAndUpdate({ _id: addsId }, { deletedAt: currentDate });
            let advertisements = await Advertisement.find(finOption);

            response = makeJsonResponse(
                `Advertaisement named "${updateAdvertisement.name}" were deleted successfuly.`,
                advertisements,
                {},
                200,
                true,
                {}
            );
            res.status(200).json(response);

        } catch (err) {
            console.log(err)
            response = makeJsonResponse("Some error occured.", {}, err, 500, false);
            res.status(200).json(response);
        }

    }




};
