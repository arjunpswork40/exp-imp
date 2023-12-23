const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false,
        enum: ['rejected', 'accepted', 'pending'],
        default: 'pending',
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
