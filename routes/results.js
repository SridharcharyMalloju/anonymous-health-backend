const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');

const SECRET = 'my_secret_result_key'; // Move to .env in production
let resultStorage = {}; // In-memory object to simulate DB

// Upload result (encrypt it)
router.post('/upload', (req, res) => {
    const { tempCode, result } = req.body;
    if (!tempCode || !result) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    const encrypted = CryptoJS.AES.encrypt(result, SECRET).toString();
    resultStorage[tempCode] = encrypted;

    res.json({ message: `✅ Result securely uploaded for ${tempCode}` });
});

// Get result (decrypt it)
router.get('/result/:code', (req, res) => {
    const encrypted = resultStorage[req.params.code];
    if (encrypted) {
        const bytes = CryptoJS.AES.decrypt(encrypted, SECRET);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        res.json({ result: decrypted });
    } else {
        res.status(404).json({ message: '❌ Result not found for this TEMP code' });
    }
});

module.exports = router;
