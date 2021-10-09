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
      this.belongsTo(models.User_ingredient);
      this.belongsToMany(models.User, {
        through: 'User_ingredient',
        foreignKey: 'ingredient_id',
      });
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
    }
  );
  return Ingredient;
};
