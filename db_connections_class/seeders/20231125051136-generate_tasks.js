'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('tasks', [
      {description: "hola soy el primer registro", id: 1, createdAt: new Date() ,updatedAt: new Date()},
      {description: "hola soy el segundo registro", id: 2, createdAt: new Date() ,updatedAt: new Date()},
      {description: "hola soy el tercer registro", id: 3, createdAt: new Date() ,updatedAt: new Date()},
      {description: "hola soy el cuarto registro", id: 4, createdAt: new Date() ,updatedAt: new Date()},
      {description: "hola soy el  quinto registro", id: 5, createdAt: new Date() ,updatedAt: new Date()},
    
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  }
};
