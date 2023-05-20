'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sale.init({
    productName: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sale',
    updatedAt: false,
    underscored: true,
  });
  return sale;
};