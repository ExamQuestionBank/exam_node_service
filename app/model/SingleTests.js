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


    // test_year: { type: STRING, allowNull: false }, // 出题年份
    // test_from: { type: STRING, allowNull: false }, // 出自（来源）
    // test_no: { type: STRING, allowNull: false }, // 试题编号
    // question: { type: STRING, allowNull: false }, // 题目内容
    // answer_a: { type: STRING, allowNull: false }, // 选项A
    // answer_b: { type: STRING, allowNull: false }, // 选项B
    // answer_c: { type: STRING, allowNull: false }, // 选项C
    // answer_d: { type: STRING, allowNull: false }, // 选项D
    // answer: { type: STRING, allowNull: false }, // 答案

    // {
    //   "test_year":"2020",
    //   "test_from":"深圳大学",
    //   "test_no":"20202020",
    //   "question":"ss41",
    //   "answer":"test41",
    //   "answer_a":"s",
    //   "answer_b":"s",
    //   "answer_c":"ddd",
    //   "answer_d":"dd"
    // }
  });
  return SINGLETESTS;
};
