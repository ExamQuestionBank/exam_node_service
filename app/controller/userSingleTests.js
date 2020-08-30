'use strict';

const Controller = require('egg').Controller;

class UserSingleTestsController extends Controller {
  async saveOrUpdate () {
    let res = null;
    const data = this.ctx.request.body;
    try {
      let qureyRes = await this.ctx.service.userSingleTests.getUserSingleTest(data);
      let isUpdate = qureyRes.length > 0
        try {
          res = await this.ctx.service.userSingleTests.saveOrUpdate(data,isUpdate);
        } catch (err) {
          res = {
            status: 'error',
            message: err,
          };
        }
    } catch(error) {
      res = {
        status: 'error',
        message: err,
      };
    }
    this.ctx.body = res;
  }

  async getUserSingleTest () {
    let res = null;
    const data = this.ctx.request.body;
    try {
      res = await this.ctx.service.userSingleTests.getUserSingleTest(data);
    } catch (err) {
      res = {
        status: 'error',
        message: err,
      };
    }
    this.ctx.body = res;
  }

  async getUserFinishedTest () {
    let res = null;
    const data = this.ctx.request.body;
    try {
      // 查询所有的题目
      let allSingleTests = await this.ctx.service.singleTests.getSingleTests(data.params)
      // 查询出用户做过的题目
      let userFinishedTest = await this.ctx.service.userSingleTests.getUserFinishedTest(data.params);
      let rows = []
      // todo做分页
      if (data.params.todo) {
        rows = allSingleTests.rows.filter(item => {
          return !userFinishedTest.find(o => item.id === o.testId)
        })
      } else {
        rows = allSingleTests.rows.filter(item => {
          return userFinishedTest.find(o => o.testId === item.id)
        })
      }
      res = {
        data: rows,
        total: allSingleTests.count,
        success: true,
      };

    } catch (err) {
      res = {
        status: 'error',
        message: err,
      };
    }
    this.ctx.body = res;
  }
}

module.exports = UserSingleTestsController;