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
      // 수정 필요
      // User.hasMany(models.User_ingredient, {
      //   as: 'refrigerator',
      //   foreignKey: 'user_id',
      // });
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
      modelName: 'User',
      timestamps: true,
    }
  );
  return User;
};
