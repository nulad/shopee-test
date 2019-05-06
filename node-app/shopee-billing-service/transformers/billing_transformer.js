'use strict';

const TaxCalculator = require('../utils/tax');

exports.billings = (transactionItems) => {
    let priceSubtotal = 0;
    let taxSubtotal = 0;
    let grandSubtotal = 0;
    const transaction = transactionItems.map((item) => {
        const taxCalc = new TaxCalculator(item.Product.dataValues.taxCode);
        const price = parseInt(item.Product.dataValues.price, 10);
        const res = {
            name: item.Product.dataValues.name,
            tax_code: item.Product.dataValues.taxCode,
            type: taxCalc.type,
            refundable: taxCalc.refundable,
            price,
            tax: taxCalc.calculate(price),
            amount: price + taxCalc.calculate(item.Product.dataValues.price)
        };
        priceSubtotal += res.price;
        taxSubtotal += res.tax;
        grandSubtotal += res.amount;
        return res;
    });
    const result = {};
    result.transaction = transaction;
    result.price_subtotal = priceSubtotal;
    result.tax_subtotal = taxSubtotal;
    result.grand_subtotal = grandSubtotal;
    return result;
};

module.exports = exports;
