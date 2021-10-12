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
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      this.belongsTo(models.Ingredient, {
        foreignKey: 'user_id',
      });
    }
  }
  User_ingredient.init(
    {
      user_id: DataTypes.INTEGER,
      ingredient_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'User_ingredient',
      modelName: 'User_ingredient',
      timestamps: false,
    }
  );
  return User_ingredient;
};
