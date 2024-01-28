const mongoose = require('mongoose');
const northAmericaSchema = new mongoose.Schema({
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


const NorthAmerica = mongoose.model('NorthAmerica', northAmericaSchema);

module.exports = NorthAmerica;
