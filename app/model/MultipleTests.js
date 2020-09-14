'use strict';

const DB = require('../database/db');

module.exports = app => {
  const { STRING } = app.Sequelize;

  const MULTIPLETESTS = DB.defineModel(app, 'tb_multiple_tests', {
    subject: { type: STRING, allowNull: false }, // 考试科目
    section: { type: STRING, allowNull: false }, // 试题板块
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
    answerAnalysis: { type: STRING, allowNull: true }, // 答案解析
    checked:{ type: Number, allowNull: true},
    answerA: { type: STRING, allowNull: false, field: 'answer_a' },
    answerB: { type: STRING, allowNull: false, field: 'answer_b' },
    answerC: { type: STRING, allowNull: false, field: 'answer_c' },
    answerD: { type: STRING, allowNull: false, field: 'answer_d' },
  });
  return MULTIPLETESTS;
};
