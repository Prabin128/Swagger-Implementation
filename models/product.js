'use strict';
const {
  Model
} = require('sequelize');
const productsController = require('../controllers/products.controller');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.userId, {
        as : "user",
        foreignKey : "userId"
      });
      Product.hasMany(models.product_stock,{as:"product_stock",foreignKey:"product_id"})
    }
  }
  Product.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    images: DataTypes.STRING,
    specification: DataTypes.STRING,
    ratings: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    rate:DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Product',
  });
  
  return Product;
};