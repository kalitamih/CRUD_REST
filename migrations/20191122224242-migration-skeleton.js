'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11).UNSIGNED
      },
      login: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      age: {
        allowNull: false,
        type: Sequelize.INTEGER(11).UNSIGNED
      },
      isDeleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN 
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
