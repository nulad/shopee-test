exports.throw = (message, status) => {
    const err = new Error(message);
    Object.assign(err, { status });
    throw err;
};

module.exports = exports;
