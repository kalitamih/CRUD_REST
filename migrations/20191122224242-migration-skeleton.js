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
        type: Sequelize.STRING,
        unique: true       
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
    },
    ); 
    await queryInterface.createTable("groups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true       
      },
      permissions: {
        allowNull: false,            
        type: Sequelize.ARRAY(Sequelize.ENUM(['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']))
      },       
    }); 
    await queryInterface.createTable("usergroup", { 
      userId: {
        type: Sequelize.INTEGER,         
        references: {
          model: "users",
          key: "id",               
        },  
        onDelete: "cascade",   
        onUpdate: "cascade",
      },
      groupId: {
        type: Sequelize.INTEGER,        
        references: {
          model: "groups",
          key: "id",      
        },  
        onDelete: "cascade", 
        onUpdate: "cascade", 
      },       
    });
    return queryInterface.addConstraint('usergroup', ['userId', 'groupId'], {
      type: 'primary key',
      name: 'usergroup_pkey'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
    await queryInterface.dropTable("groups");
    return queryInterface.dropTable("usergroup");
  }
};
