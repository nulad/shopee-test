module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            field: 'id',
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            field: 'name'
        },
        taxCode: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'tax_code'
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            field: 'price'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'updated_at'
        }
    }, {
        tableName: 'product'
    });
    return Product;
};
