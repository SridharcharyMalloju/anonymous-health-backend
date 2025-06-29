const Result = require('../models/resultModel');
const CryptoJS = require('crypto-js');

const SECRET = process.env.RESULT_SECRET || 'my_secret_result_key';

// POST: Create encrypted result
exports.createResult = async (req, res) => {
    const { tempCode, result } = req.body;
    if (!tempCode || !result) {
        return res.status(400).json({ message: 'Missing fields' });
    }
    try {
        const encrypted = CryptoJS.AES.encrypt(result, SECRET).toString();
        const newResult = new Result({ tempCode, encryptedResult: encrypted });
        await newResult.save();
        res.status(201).json({ message: '✅ Result securely stored' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// GET: Decrypt and return result
exports.getAllResults = async (req, res) => {
    try {
        const results = await Result.find();
        const decryptedResults = results.map(r => {
            const bytes = CryptoJS.AES.decrypt(r.encryptedResult, SECRET);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            return { tempCode: r.tempCode, result: decrypted };
        });
        res.json(decryptedResults);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
