'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Ingredient, {
        through: 'User_ingredient',
        foreignKey: 'user_id',
      });
    }
  }
  User.init(
    {
      admin: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'User',
      modelName: 'User',
      timestamps: true,
    }
  );
  return User;
};
