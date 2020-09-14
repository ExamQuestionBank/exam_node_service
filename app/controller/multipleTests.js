'use strict';

const Controller = require('egg').Controller;

class MultipleTestsController extends Controller {

  async saveOrUpdate() {
    let res = null;
    const data = this.ctx.request.body;
    try {
      res = await this.ctx.service.multipleTests.saveOrUpdate(data);
    } catch (err) {
      res = {
        status: 'error',
        message: err,
      };
    }
    this.ctx.body = res;
  }

  async getMultipleTests() {
    let res = {};
    const data = this.ctx.request.body;
    try {
      const MultipleTestsData = await this.ctx.service.multipleTests.getMultipleTests(data.params);
      res = {
        data: MultipleTestsData.rows,
        total: MultipleTestsData.count,
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

  async deleteMultipleTests() {
    let res = null;
    const data = this.ctx.request.body;
    try {
      res = await this.ctx.service.multipleTests.deleteMultipleTests(data);
    } catch (err) {
      res = {
        status: 'error',
        message: err,
      };
    }
    this.ctx.body = res;
  }

}

module.exports = MultipleTestsController;
