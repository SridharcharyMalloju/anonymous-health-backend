const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    tempCode: { type: String, required: true, unique: true },
    encryptedResult: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
