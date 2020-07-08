'use strict';

const DB = require('../database/db');

module.exports = app => {
  const { STRING } = app.Sequelize;

  const SINGLETESTS = DB.defineModel(app, 'tb_single_tests', {
    subject: { type: STRING, allowNull: false }, // 考试科目
    test_year: { type: STRING, allowNull: false }, // 出题年份
    test_form: { type: STRING, allowNull: false }, // 出自（来源）
    test_no: { type: STRING, allowNull: false }, // 试题编号
    question: { type: STRING, allowNull: false }, // 题目内容
    answer_a: { type: STRING, allowNull: false }, // 选项A
    answer_b: { type: STRING, allowNull: false }, // 选项B
    answer_c: { type: STRING, allowNull: false }, // 选项C
    answer_d: { type: STRING, allowNull: false }, // 选项D
    answer: { type: STRING, allowNull: false }, // 答案

  });
  return SINGLETESTS;
};
