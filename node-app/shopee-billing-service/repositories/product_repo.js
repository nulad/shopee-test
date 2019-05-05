'use strict';

const models = require('../models');

exports.create = async (payload) => {
    const DBContext = await models.getContext();
    return DBContext.Product.create(payload);
};

module.exports = exports;
