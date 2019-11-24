'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      { login: 'Stephane', password: 'StephsBlogTitle', age: 40 },
      { login: 'Mikhail', password: 'equebbdhjbds378273', age: 45 },
      { login: 'Frank', password: 'Chelsea2019', age: 42 },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
