const test = require('ava');
const sinon = require('sinon');
const method = require('../../methods/tax');
const productRepo = require('../../repositories/product_repo');

test.serial('create Tax Object success', async (t) => {
    try {
        const data = {
            name: 'pizza',
            tax_code: 1,
            price: 2000
        };

        t.context.sandbox.stub(productRepo, 'create').resolves({
            name: 'pizza',
            taxCode: 1,
            price: 2000
        });

        const result = await method.create(data);
        t.is(result.name, 'pizza');
        t.is(result.taxCode, 1);
        t.is(result.price, 2000);
    } catch (error) {
        t.fail(error.stack);
    }
});

test.serial('create Tax Object validation error', async (t) => {
    try {
        const data = {
            name: 'pizza',
            tax_code: 1,
            price: -1
        };

        await method.create(data);
    } catch (error) {
        t.true(error.message.includes('["price" must be larger than or equal to 0]'));
    }
});

test.beforeEach('Initialize New Sandbox Before Each Test', async (t) => {
    t.context.sandbox = sinon.createSandbox().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', async (t) => {
    t.context.sandbox.restore();
});
