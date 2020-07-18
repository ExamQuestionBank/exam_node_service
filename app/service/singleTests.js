'use strict';

const Service = require('egg').Service;

class SingleTestsService extends Service {
  async saveOrUpdate(data) {
    let res = null;
    try {
      if (data.id) {
        res = await this.ctx.model.SingleTests.update(data, {
          where: {
            id: Number(data.id),
          } });
      } else {
        res = await this.ctx.model.SingleTests.upsert(data);
      }
    } catch (err) {
      res = err;
    }
    return res;
  }

  async deleteSingleTests(testIds) {
    const {ids} = testIds
    let res = null;
    await this.ctx.model.SingleTests.destroy({
      where: {
        id:ids
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

  async getSingleTests(params) {
    const { ctx } = this;
    let res = [];
    const { current = 1, pageSize = 10,testNo,subject,testFrom,testYear } = params;
    const whereParams = {testNo,subject,testFrom,testYear}
    for(let i in whereParams) {
      if (whereParams[i] === '' || whereParams[i] === null || whereParams[i] === undefined) {
        delete whereParams[i]
      }
    }
    
    await ctx.model.SingleTests.findAndCountAll({
      order: [['updatedAt', 'DESC']],
      where: whereParams,
      limit: pageSize,
      offset: pageSize * (current - 1),
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

