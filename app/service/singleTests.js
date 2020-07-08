'use strict';

const Service = require('egg').Service;

class SingleTestsService extends Service {
  async saveOrUpdate(data) {
    let res = null;
    try {
      res = await this.ctx.model.SingleTests.upsert(data);
    } catch (err) {
      res = err;
    }
    return res;
  }

  async delete(id) {
    let res = null;
    await this.ctx.model.SingleTests.destroy({
      where: {
        id,
      },
    }).then(() => {
      res = {
        code: 200,
        status: 'ok',
      };
    }).catch(err => {
      res = {
        status: 'error',
        message: err,
      };
    });
    return res;
  }

  async getSingleTestById(id) {
    let res = null;
    await this.ctx.model.SingleTests.findById(id).then(() => {
      res = {
        code: 200,
        status: 'ok',
      };
    }).catch(err => {
      res = {
        status: 'error',
        message: err,
      };
    });
    return res;
  }

  async getSingleTest(params) {
    const { ctx } = this;
    let res = [];
    const { currentPage = 1, pageSize = 10 } = params;
    await ctx.model.Article.findAndCountAll({
      limit: pageSize,
      offset: pageSize * (currentPage - 1),
    }).then(result => {
      res = result;
    }).catch(err => {
      res = {
        status: 'error',
        message: err,
      };
    });
    return res;
  }
}

module.exports = SingleTestsService;

