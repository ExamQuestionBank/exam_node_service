'use strict';

const Controller = require('egg').Controller;

class SingleTestsController extends Controller {

  async saveOrUpdate() {
    let res = null;
    const data = this.ctx.request.body;
    try {
      res = await this.ctx.service.singleTests.saveOrUpdate(data);
    } catch (err) {
      res = {
        status: 'error',
        message: err,
      };
    }
    this.ctx.body = res;
  }

  async getSingleTests() {
    let res = {};
    const data = this.ctx.request.body;
    try {
      const SingleTestsData = await this.ctx.service.singleTests.getSingleTests(data.params);
      res = {
        data: SingleTestsData.rows,
        total: SingleTestsData.count,
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

  async deleteSingleTests() {
    let res = null;
    const data = this.ctx.request.body;
    try {
      res = await this.ctx.service.singleTests.deleteSingleTests(data);
    } catch (err) {
      res = {
        status: 'error',
        message: err,
      };
    }
    this.ctx.body = res;
  }

}

module.exports = SingleTestsController;
