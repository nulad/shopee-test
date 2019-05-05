module.exports = (sequelize, DataTypes) => {
    const TransactionItem = sequelize.define('TransactionItem', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            field: 'id'
        },
        productId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'product',
                key: 'id'
            },
            field: 'product_id'
        },
        transactionId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'transaction',
                key: 'id'
            },
            field: 'transaction_id'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at'
        }
    }, {
        tableName: 'transaction_item'
    });
    return TransactionItem;
};
