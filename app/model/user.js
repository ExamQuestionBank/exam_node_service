'use strict';

const DB = require('../database/db');

module.exports = app => {
  const { STRING } = app.Sequelize;

  const USER = DB.defineModel(app, 'users', {
    username: { type: STRING, unique: true, allowNull: false }, // 用户名
    password: { type: STRING, allowNull: false }, // 密码
  });

  return USER;
};
