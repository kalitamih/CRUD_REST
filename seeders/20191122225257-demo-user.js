'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      { login: 'Stephane', password: 'StephsBlogTitle', age: 40 },
      { login: 'Mikhail', password: 'equebbdhjbds378273', age: 45 },
      { login: 'Frank', password: 'Chelsea2019', age: 42 },
    ], {});
    return queryInterface.bulkInsert('groups', [
      { name: 'Chelsea', permissions: [] },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
