'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
        type: Sequelize.INTEGER
      },
      isDeleted: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN 
      },       
    });
    return queryInterface.addIndex("users", { unique: true, fields: ["login"] });    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
