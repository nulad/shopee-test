'use strict';

const express = require('express');
const { taxEndpoint } = require('shopee-billing-service');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const result = await taxEndpoint.create(req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
