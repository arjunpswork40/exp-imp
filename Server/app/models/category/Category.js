const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    have_data: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        required: false,
    },
    // data: [
    //     {
    //         key: {
    //             type: String,
    //             required: true
    //         },
    //         value: {
    //             type: mongoose.Schema.Types.Mixed,
    //             required: true
    //         }

    //     }],
    data: [{
        type: mongoose.Schema.Types.Mixed,
        default: null
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    dataFieldsAndType: [{
        type: mongoose.Schema.Types.Mixed,
        default: null
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const dataFields = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    validationRule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ValidationRule',
        default: null,
    },
    isCategory: {
        type: Boolean,
        default: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        default: null,
    }
});

const validationRule = new mongoose.Schema({
    rule: {
        type: String,
        required: true,
    },
    dataField: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DataField',
        default: null,
    }]
});

// const fileValidationRule = new mongoose.Schema({
//     rule: {
//         type: String,
//         required: true,
//     },
//     value: {
//         type: String,
//         required: true
//     },
//     dataField: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'DataField',
//         default: null,
//     }]
// });

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    have_data: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        required: false,
    },
    data: [{
        type: mongoose.Schema.Types.Mixed,
        default: null
    }],
    subcategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        default: null
    }],
    recommendedStatus: {
        type: Boolean,
        default: false
    },
    dataFieldsAndType: [{
        type: mongoose.Schema.Types.Mixed,
        default: null
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


const Category = mongoose.model('Category', categorySchema);
const SubCategory = mongoose.model('SubCategory', subcategorySchema);
const DataField = mongoose.model('DataField', dataFields);
const ValidationRule = mongoose.model('ValidationRule', validationRule);
// const FileValidation = mongoose.model('fileValidationRule', fileValidationRule);

module.exports = { Category, SubCategory, DataField, ValidationRule };
