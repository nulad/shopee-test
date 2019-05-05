'use strict';

const Joi = require('joi');
const Sequelize = require('sequelize');

let configuration = null;
let modelsInitialized = false;
const models = {
    ORMProvider: Sequelize
};

exports.configure = (config) => {
    const configurationSchema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
        database: Joi.string().required(),
        host: Joi.string().required(),
        dialect: Joi.string().required().default('mysql')
    });

    const validation = Joi.validate(config, configurationSchema);

    if (validation.error) {
        throw validation.error;
    } else {
        configuration = validation.value;
    }
};

exports.getContext = async () => {
    if (configuration === null) {
        throw new Error('Not Configured');
    }

    if (modelsInitialized === true) {
        return models;
    }

    const sequelize = new Sequelize(
        configuration.database,
        configuration.username,
        configuration.password,
        configuration
    );

    models.Product = require('./product.js')(sequelize, models.ORMProvider);
    models.TransactionItem = require('./transaction_item.js')(sequelize, models.ORMProvider);
    models.Transaction = require('./transaction.js')(sequelize, models.ORMProvider);

    models.Product.hasMany(models.TransactionItem, { foreignKey: 'product_id', sourceKey: 'id' });
    models.TransactionItem.belongsTo(models.Product, { foreignKey: 'product_id', targetKey: 'id' });

    models.Transaction.hasMany(models.TransactionItem, { foreignKey: 'transaction_id', sourceKey: 'id' });
    models.TransactionItem.belongsTo(models.Transaction, { foreignKey: 'transaction_id', targetKey: 'id' });

    models.context = sequelize;
    modelsInitialized = true;

    return models;
};

module.exports = exports;
