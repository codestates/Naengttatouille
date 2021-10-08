'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 수정 필요
      // User_ingredient.belongsTo(models.User, {
      //   as: 'user',
      //   foreignKey: 'user_id',
      // });
      // User_ingredient.hasMany(models.Ingredient, {
      //   as: 'items',
      //   foreignKey: 'ingredient_id',
      // });
    }
  }
  User_ingredient.init(
    {
      user_id: DataTypes.INTEGER,
      ingredient_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User_ingredient',
    }
  );
  return User_ingredient;
};
