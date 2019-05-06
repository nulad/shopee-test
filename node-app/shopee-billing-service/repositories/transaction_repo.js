'use strict';

const models = require('../models');

exports.findOne = async (where) => {
    const DBContext = await models.getContext();
    return DBContext.Transaction.findOne(where);
};

module.exports = exports;
