'use strict';

const DB = require('../database/db');

module.exports = app => {
  const {STRING,NUMBER} = app.Sequelize;

  const USERSINGLETESTS = DB.defineModel(app, 'tb_user_singletest_bank', {
    userId:{
      type:NUMBER, allowNull: false, field: 'user_id',
    },
    testId: {
      type:NUMBER, allowNull: false, field: 'test_id',
    },
    answer: { type: STRING, allowNull: false }, // 答案
  })

  return USERSINGLETESTS;
}