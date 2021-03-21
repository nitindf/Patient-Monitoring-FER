const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    birth_date: {
        type: Date,
    },
    location: {
        type: String
    },
    stage: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    reg_date: {
        type: Date,
        default: Date.now
    },
    recordings: {
        type: [{
            "expression": { type: String },
            "time": {
                type: Date,
                default: Date.now
            },
        }]
    }
});

module.exports = Patient = mongoose.model('Patient', patientSchema);