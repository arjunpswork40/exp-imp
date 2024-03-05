const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    nameOfTheTeacher: {
        type: String,
        required: true
    },
    specializedIn: {
        type: String,
        required: false
    },
    experience: {
        type: String,
        required: false
    }
});

const areaOfStudySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    studentsCount: {
        type: String,
        required: false
    },
    rating: {
        type: String,
        required: false
    },
    // teachersList: [teacherSchema]
});
 const amenitiesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
 })

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
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const instituteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    enqueries:[enquerySchema],
    areasOfStudy: [areaOfStudySchema],
    amenities: [amenitiesSchema],
    teachersList: [teacherSchema],
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    shortName: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    district: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    countryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Australia'
    },
    titleImage: {
        type: String,
        required: false
    },
    relatedDocuments: {
        type: [String],
        default: [],
        required: false
    },
    relatedVideos: {
        type: [String],
        default: [],
        required: false
    },
    relatedImages: {
        type: [String],
        default: [],
        required: false
    }
});

const InstitutesInAustralia = mongoose.model('InstitutesInAustralia', instituteSchema);

module.exports = InstitutesInAustralia;
