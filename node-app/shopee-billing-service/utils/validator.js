'use strict';

const Joi = require('joi');
const error = require('./error');

const {
    TAX_CODE
} = require('../utils/constants');

const CREATE_TAX_SCHEMA = Joi.object().keys({
    name: Joi.string().required(),
    tax_code: Joi.number().integer().required().allow(TAX_CODE),
    price: Joi.number().min(0).required()
});

const SCHEMA = {
    tax_create: CREATE_TAX_SCHEMA
};

const validate = async (payload, schema) => Joi.validate(payload, SCHEMA[schema]);

module.exports = {
    validate
};
