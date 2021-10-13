const AWS = require('aws-sdk');
AWS.config();
module.exports = {
  development: {
    username: AWS.DATABASE_USERNAME,
    password: AWS.DATABASE_PASSWORD,
    database: AWS.DATABASE_NAME,
    host: AWS.DATABASE_HOST,
    port: AWS.DATABASE_PORT,
    dialect: 'mysql',
  },
  test: {
    username: AWS.DATABASE_USERNAME,
    password: AWS.DATABASE_PASSWORD,
    database: AWS.DATABASE_NAME,
    host: AWS.DATABASE_HOST,
    port: AWS.DATABASE_PORT,
    dialect: 'mysql',
  },
  production: {
    username: AWS.DATABASE_USERNAME,
    password: AWS.DATABASE_PASSWORD,
    database: AWS.DATABASE_NAME,
    host: AWS.DATABASE_HOST,
    port: AWS.DATABASE_PORT,
    dialect: 'mysql',
  },
};
