'use strict';
const bcrypt = require("bcrypt")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password_hash: DataTypes.STRING,
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      set(value) {
        // Este setter asigna el valor al campo virtual
        this.setDataValue('password', value);
      }
    },
  }, {
    hooks: {
      beforeCreate: (async (user, options) => {
        if (user.password) {
          try {
            const hash = await bcrypt.hash(user.password, 10);
            user.password_hash = hash;
          } catch (error) {
            console.error('Error al hashear la contraseña:', error);
          }
        }
      })
    },
    sequelize,
    modelName: 'User',
  });
  User.login = function (email, password) {
    return User.findOne({
      where: {
        email: email
      }
    }).then(user => {
      if (!user) return null
      return user.authenticatePassword(password).then(valid => valid ? user : null)
    })
  }
  User.prototype.authenticatePassword = function (password) {
    return new Promise((res, rej) => {
      bcrypt.compare(password, this.password_hash, function (err, valid) {
        if (err) return rej(err)
        res(valid)
      })
    })
  }
  return User;
};


