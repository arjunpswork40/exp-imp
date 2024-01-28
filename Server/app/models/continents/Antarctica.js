const mongoose = require('mongoose');
const antarcticaSchema = new mongoose.Schema({
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


const Antarctica = mongoose.model('Antarctica', antarcticaSchema);

module.exports = Antarctica;
