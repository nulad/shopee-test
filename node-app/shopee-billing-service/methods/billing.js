'use strict';

const Validator = require('../utils/validator');
const TransactionRepo = require('../repositories/transaction_repo');
const TransactionItemRepo = require('../repositories/transaction_item_repo');
const BillingTransformer = require('../transformers/billing_transformer');
const error = require('../utils/error');

exports.view = async (data) => {
    try {
        const {
            user_id: userId,
            transaction_id: transactionId
        } = await Validator.validate(data, 'billing_view')
            .catch((err) => {
                error.throw(err.message, 400);
            });

        const transaction = await TransactionRepo.findOne({
            userId,
            transactionId
        });

        if (!transaction) {
            error.throw('Transaction Not Found', 404);
        }

        const transactionItems = await TransactionItemRepo.findAllWithProduct(transaction.id);

        const result = BillingTransformer.billings(transactionItems);

        return result;
    } catch (err) {
        throw err;
    }
};

module.exports = exports;
