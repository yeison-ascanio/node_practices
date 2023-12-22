'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Tasks", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "Users"
        },
        model: "User",
        key: "id"
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Tasks", "userId")
  }
};
