const test = require('ava');
const request = require('supertest');
const sinon = require('sinon');
const { billingEndpoint } = require('shopee-billing-service');
const app = require('../../app');


test.serial('View Billing', async (t) => {
    const res = {
        transaction: [
            {
                name: 'Big Mac',
                tax_code: 1,
                type: 'Food & Beverage',
                refundable: true,
                price: 1000,
                tax: 100,
                amount: 1100
            },
            {
                name: 'Lucky Strike',
                tax_code: 2,
                type: 'Tobacco',
                refundable: false,
                price: 1000,
                tax: 30,
                amount: 1030
            },
            {
                name: 'Seraton Hotel',
                tax_code: 3,
                type: 'Entertainment',
                refundable: false,
                price: 1000000,
                tax: 9999,
                amount: 1009999
            }
        ],
        price_subtotal: 1002000,
        tax_subtotal: 10129,
        grand_subtotal: 1012129
    };
    t.context.sandbox.stub(billingEndpoint, 'view').resolves(res);

    try {
        const response = await request(app).get('/billing/1/transaction/1');
        t.is(response.status, 200);
        t.deepEqual(response.body, res);
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('View Billing not found', async (t) => {
    const err = new Error('Transaction Not Found');
    err.status = 404;
    t.context.sandbox.stub(billingEndpoint, 'view').rejects(err);

    try {
        const response = await request(app).get('/billing/1/transaction/2');
        t.is(response.status, 404);
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
