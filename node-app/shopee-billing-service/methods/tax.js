'use strict';

const Validator = require('../utils/validator');
const ProductRepo = require('../repositories/product_repo');
const error = require('../utils/error');

exports.create = async (data) => {
    try {
        const {
            name,
            tax_code: taxCode,
            price
        } = await Validator.validate(data, 'tax_create')
            .catch((err) => {
                error.throw(err.message, 400);
            });

        const result = await ProductRepo.create({
            name,
            taxCode,
            price
        });

        return result;
    } catch (err) {
        throw err;
    }
};

module.exports = exports;
