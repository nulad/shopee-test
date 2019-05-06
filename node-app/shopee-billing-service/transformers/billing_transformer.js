'use strict';

const TaxCalculator = require('../utils/tax');

exports.billings = (transactionItems) => {
    const result = transactionItems.map((item) => {
        const taxCalc = new TaxCalculator(item.Product.dataValues.taxCode);
        const price = parseInt(item.Product.dataValues.price, 10);
        return {
            name: item.Product.dataValues.name,
            tax_code: item.Product.dataValues.taxCode,
            type: taxCalc.type,
            refundable: taxCalc.refundable,
            price,
            tax: taxCalc.calculate(price),
            amount: price + taxCalc.calculate(item.Product.dataValues.price)
        };
    });
    return result;
};

module.exports = exports;
