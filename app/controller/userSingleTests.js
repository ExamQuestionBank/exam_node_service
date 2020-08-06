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
      let allSingleTests = await this.ctx.service.singleTests.getSingleTests(data)
      let userFinishedTest = await this.ctx.service.userSingleTests.getUserFinishedTest(data.params);
      let rows = []
      if (data.params.todo) {
        rows = allSingleTests.rows.filter(item => {
          return !userFinishedTest.find(o => o.testId === item.id)
        })
      } else {
        rows = allSingleTests.rows.filter(item => {
          return userFinishedTest.find(o => o.testId === item.id)
        })
      }
      res = {
        data: rows,
        total: rows.length,
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