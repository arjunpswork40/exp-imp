const mongoose = require('mongoose');
const europeSchema = new mongoose.Schema({
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


const Europe = mongoose.model('Europe', europeSchema);

module.exports = Europe;
