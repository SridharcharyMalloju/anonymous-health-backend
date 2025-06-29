const express = require('express');
const Sample = require('../models/Sample');
const router = express.Router();

router.post('/add', async (req, res) => {
    const sample = new Sample(req.body);
    await sample.save();
    res.status(201).send('Sample added');
});

router.get('/all', async (req, res) => {
    const samples = await Sample.find();
    res.json(samples);
});

module.exports = router;