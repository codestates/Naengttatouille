'use strict';
const { ingredients } = require('../seederdata');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ingredient', [...ingredients], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ingredient', null, {});
  },
};
