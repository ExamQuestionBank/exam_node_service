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
}

module.exports = UserSingleTestsController;