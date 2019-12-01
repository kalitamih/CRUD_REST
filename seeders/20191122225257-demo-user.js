'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      { login: 'Stephane', password: '$2b$10$9uCRax68TUjDs3WJSIRV1O6lmIISkNMee5SP0OwGOGHPTwIYVN6LC', age: 40 },
      { login: 'Mikhail', password: 'equebbdhjbds378273', age: 45 },
      { login: 'Frank', password: 'Chelsea2019', age: 42 },
    ], {});
    await queryInterface.bulkInsert('groups', [
      { name: 'Chelsea', permissions: Sequelize.literal(`ARRAY['READ', 'WRITE']::"enum_groups_permissions"[]`), },
      { name: 'Lester', permissions: Sequelize.literal(`ARRAY['READ', 'DELETE', 'SHARE', 'UPLOAD_FILES']::"enum_groups_permissions"[]`), },
    ], {});
    return queryInterface.bulkInsert('usergroup', [
      { userId: 1, groupId: 1, },
      { userId: 2, groupId: 2, },
      { userId: 1, groupId: 2, },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
    await queryInterface.dropTable("groups");
    return queryInterface.dropTable("usergroup");
  }
};
