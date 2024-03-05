const mongoose = require('mongoose');
const enquerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: false
    },
    continent:{
        type: String,
        required: false
    },
    countryId: {
        type: mongoose.Types.ObjectId,
        required: false
    },  
    instituteId: {
        type: mongoose.Types.ObjectId,
        required: false
    },  
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


const Enquery = mongoose.model('Enquery', enquerySchema);

module.exports = Enquery;
