'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userId extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userId.init({
    name: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'userId',
  });
  userId.associate = function (models){
    userId.hasMany(models.Product, {
      as : "product",
      foreignKey : "userId"
    })
  }
  return userId;
}
