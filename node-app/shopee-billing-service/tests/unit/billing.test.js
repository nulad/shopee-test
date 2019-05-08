const test = require('ava');
const sinon = require('sinon');
const method = require('../../methods/billing');
const TransactionRepo = require('../../repositories/transaction_repo');
const TransactionItemRepo = require('../../repositories/transaction_item_repo');

test.serial('view billing success', async (t) => {
    try {
        const data = {
            user_id: 1,
            transaction_id: 1
        };

        t.context.sandbox.stub(TransactionRepo, 'findOne').resolves({
            transaction_Id: 1,
            userId: 1
        });

        t.context.sandbox.stub(TransactionItemRepo, 'findAllWithProduct').resolves([
            {
                Product: {
                    dataValues: {
                        taxCode: 1,
                        price: 1000,
                        name: 'pizza'
                    }
                }
            },
            {
                Product: {
                    dataValues: {
                        taxCode: 2,
                        price: 2000,
                        name: '234'
                    }
                }
            },
            {
                Product: {
                    dataValues: {
                        taxCode: 3,
                        price: 3000,
                        name: 'Movies'
                    }
                }
            }
        ]);

        const result = await method.view(data);
        t.is(result.transaction.length, 3);
        t.is(result.transaction[0].name, 'pizza');
        t.is(result.transaction[1].name, '234');
        t.is(result.transaction[2].name, 'Movies');
        t.is(result.transaction[0].price, 1000);
        t.is(result.transaction[1].price, 2000);
        t.is(result.transaction[2].price, 3000);
        t.is(result.transaction[0].tax, 100);
        t.is(result.transaction[1].tax, 50);
        t.is(result.transaction[2].tax, 29);
        t.is(result.transaction[0].type, 'Food & Beverage');
        t.is(result.transaction[1].type, 'Tobacco');
        t.is(result.transaction[2].type, 'Entertainment');
        t.is(result.transaction[0].amount, 1100);
        t.is(result.transaction[1].amount, 2050);
        t.is(result.transaction[2].amount, 3029);
    } catch (error) {
        t.fail(error.stack);
    }
});

test.serial('view billing Not Found', async (t) => {
    try {
        const data = {
            user_id: 1,
            transaction_id: 2
        };

        t.context.sandbox.stub(TransactionRepo, 'findOne').resolves();

        await method.view(data);
        t.fail('should throw error');
    } catch (error) {
        t.is(error.message, 'Transaction Not Found');
    }
});

test.serial('view billing Validation Error', async (t) => {
    try {
        const data = {
            user_id: 1,
            transaction_id: 'asa'
        };

        t.context.sandbox.stub(TransactionRepo, 'findOne').resolves();

        await method.view(data);
        t.fail('should throw error');
    } catch (error) {
        t.true(error.message.includes('["transaction_id" must be a number]'));
    }
});

test.beforeEach('Initialize New Sandbox Before Each Test', async (t) => {
    t.context.sandbox = sinon.createSandbox().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', async (t) => {
    t.context.sandbox.restore();
});
