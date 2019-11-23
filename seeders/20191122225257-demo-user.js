'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      { id: 1, login: 'Stephane', password: 'StephsBlogTitle', age: 40, isDeleted: false },
      { id: 2, login: 'Mikhail', password: 'equebbdhjbds378273', age: 45, isDeleted: false },
      { id: 3, login: 'Frank', password: 'Chelsea2019', age: 42, isDeleted: false },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
