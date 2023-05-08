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
      // define association here
    }
  }
  Product.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    images: DataTypes.STRING,
    specification: DataTypes.STRING,
    ratings: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  Product.associate = function (models){
    Product.belongsTo(models.userId, {
      as : "user",
      foreignKey : "userId"
    })
  }
  return Product;
};