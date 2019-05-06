const test = require('ava');
const request = require('supertest');
const sinon = require('sinon');
const { taxEndpoint } = require('shopee-billing-service');
const app = require('../../app');


test.serial('create tax object', async (t) => {
    const res = {
        id: 3,
        name: 'Seraton Hotel',
        taxCode: 3,
        price: 1000000,
        updatedAt: '2019-05-06T08:22:25.820Z',
        createdAt: '2019-05-06T08:22:25.820Z'
    };
    t.context.sandbox.stub(taxEndpoint, 'create').resolves(res);

    try {
        const response = await request(app).post('/taxes').send({
            name: 'Seraton Hotel',
            tax_code: 3,
            price: 1000000
        });
        t.is(response.status, 200);
        t.deepEqual(response.body, res);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('create tax object validation error', async (t) => {
    const err = new Error('validation error');
    err.status = 400;
    t.context.sandbox.stub(taxEndpoint, 'create').rejects(err);

    try {
        const response = await request(app).post('/taxes').send({
            name: 'Seraton Hotel',
            tax_code: 3,
            price: 'asa'
        });
        t.is(response.status, 400);
    } catch (error) {
        t.fail(error.message);
    }
});

test.beforeEach('Initialize New Sandbox Before Each Test', async (t) => {
    t.context.sandbox = sinon.createSandbox().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', async (t) => {
    t.context.sandbox.restore();
});
