const models = require('./models');
const taxEndpoint = require('./methods/tax');
const config = require('./config/config.json');

models.configure({
    username: config.username,
    password: config.password,
    database: config.database,
    host: config.host,
    dialect: config.dialect
});

module.exports = {
    taxEndpoint
};
