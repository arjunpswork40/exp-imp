const mongoose = require('mongoose');
const appDetailSchema = new mongoose.Schema({
    privacy_policy_en: {
        type: String,
        required: false
    },
    privacy_policy_ml: {
        type: String,
        required: false
    },
    terms_and_conditions_en: {
        type: String,
        required: false,
    },
    terms_and_conditions_ml: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false
    },
    digital_visiting_card: {
        type: String,
        required: false
    },
    instagaram_link: {
        type: String,
        required: false
    },
    facebook_link: {
        type: String,
        required: false
    },
    twiter_link: {
        type: String,
        required: false
    },
    whatsapp_number: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    palystore_link: {
        type: String,
        required: false
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


const AppDetail = mongoose.model('AppDetail', appDetailSchema);

module.exports = AppDetail;
