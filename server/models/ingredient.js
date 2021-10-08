'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 수정 필요
      // Ingredient.belongsTo(models.User_ingredient, {
      //   as: 'refrigerator',
      //   foreignKey: 'ingredient_id',
      // });
    }
  }
  Ingredient.init(
    {
      name: DataTypes.STRING,
      keep_method: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Ingredient',
      timestamps: true,
    }
  );
  return Ingredient;
};
