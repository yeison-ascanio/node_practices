'use strict';
const {
  Model
} = require('sequelize');
const socket = require('../realTime/client');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User, {
        as: "user"
      })
      Task.belongsToMany(models.Category, {
        through: "TaskCategories",
        as: "categories"
      })
    }
  }
  Task.init({
    description: DataTypes.TEXT
  }, {
    hooks: {
      afterCreate : (function(task,options){
        socket.emit("new_task", {task})
      })
    },
    sequelize,
    modelName: 'Task',
  });
  return Task;
};