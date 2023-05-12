'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product_stock.belongsTo(models.Product,{as:"product",foreignKey:"product_id"})
      product_stock.belongsTo(models.User,{as:"user",foreignKey:"user_id"})
    }
  }
  product_stock.init({
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total_amount: DataTypes.FLOAT,
    user_id:DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'product_stock',
  });
  return product_stock;
};