const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, 'Please enter a valid 10 digit mobile number'],
    },
    comment: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: false,
        default: Date.now
    },
    orderOfShow: {
        type: Number,
        required: false,
        default: 0,
    },
    duration: {
        type: Number,
        required: false,
        default: 0,
    },
    paymentStatus: {
        type: Boolean,
        required: false,
        default: false,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: {
        type: Date,
        default: null,
    },
});


const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advertisement;
