const mongoose = require('mongoose');
const asiaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    imagePath: {
        type: String,
        required: false
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


const Asia = mongoose.model('Asia', asiaSchema);

module.exports = Asia;
