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

}

module.exports = SingleTestsController;
