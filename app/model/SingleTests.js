'use strict';

const DB = require('../database/db');

module.exports = app => {
  const { STRING } = app.Sequelize;

  const SINGLETESTS = DB.defineModel(app, 'tb_single_tests', {
    subject: { type: STRING, allowNull: false }, // 考试科目
    testYear: {
      type: STRING, allowNull: false, field: 'test_year',
    },
    testFrom: {
      type: STRING, allowNull: false, field: 'test_from',
    },
    testNo: {
      type: STRING, allowNull: false, field: 'test_no',
    },
    question: { type: STRING, allowNull: false }, // 题目内容
    answer: { type: STRING, allowNull: false }, // 答案
    answerA: { type: STRING, allowNull: false, field: 'answer_a' },
    answerB: { type: STRING, allowNull: false, field: 'answer_b' },
    answerC: { type: STRING, allowNull: false, field: 'answer_c' },
    answerD: { type: STRING, allowNull: false, field: 'answer_d' },
  });
  return SINGLETESTS;
};
