'use strict';

const express = require('express');
const { billingEndpoint } = require('shopee-billing-service');

const router = express.Router();

router.get('/:user_id/transaction/:transaction_no', async (req, res, next) => {
    try {
        const {
            user_id: userId,
            transaction_no: transactionId
        } = req.params;
        const result = await billingEndpoint.view({
            user_id: userId,
            transaction_id: transactionId
        });
        res.json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
