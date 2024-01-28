const mongoose = require('mongoose');
const SouthAmericaSchema = new mongoose.Schema({
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


const SouthAmerica = mongoose.model('SouthAmerica', SouthAmericaSchema);

module.exports = SouthAmerica;
