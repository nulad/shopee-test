'use strict';

const models = require('../models');

exports.findAllWithProduct = async (transactionId) => {
    const DBContext = await models.getContext();
    return DBContext.TransactionItem.findAll({
        where: {
            transactionId
        },
        include: [
            {
                model: DBContext.Product,
                required: true
            }
        ]
    });
};

module.exports = exports;
