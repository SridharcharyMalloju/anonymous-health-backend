const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
    code: String,
    collectedAt: Date,
    status: String
});

module.exports = mongoose.model('Sample', sampleSchema);