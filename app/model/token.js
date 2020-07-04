'use strict';

const DB = require('../database/db');

module.exports = app => {
  const { STRING, UUID } = app.Sequelize;

  const TOKEN = DB.defineModel(app, 'users', {
    uid: { type: UUID, unique: true, allowNull: false }, // 用户id
    access_token: { type: STRING, unique: true, allowNull: false }, // 2小时的 Token
    refresh_token: { type: STRING, unique: true, allowNull: false }, // 7天的 Token
  });

  return TOKEN;
};
