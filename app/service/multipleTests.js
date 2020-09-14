'use strict';

const Service = require('egg').Service;

class MultipleTestsService extends Service {
  async saveOrUpdate(data) {
    let res = null;
    try {
      if (data.id) {
        res = await this.ctx.model.MultipleTests.update(data, {
          where: {
            id: Number(data.id),
          } });
      } else {
        res = await this.ctx.model.MultipleTests.upsert(data);
      }
    } catch (err) {
      res = err;
    }
    return res;
  }

  async deleteMultipleTests(testIds) {
    const {ids} = testIds
    let res = null;
    await this.ctx.model.MultipleTests.destroy({
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

  async getMultipleTestById(id) {
    let res = null;
    await this.ctx.model.MultipleTests.findById(id).then(() => {
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

  async getMultipleTests(params) {
    const { ctx } = this;
    let res = [];
    const { current = 1, pageSize = 10,testNo,subject,testFrom,testYear } = params;
    const whereParams = {testNo,subject,testFrom,testYear}
    for(let i in whereParams) {
      if (whereParams[i] === '' || whereParams[i] === null || whereParams[i] === undefined) {
        delete whereParams[i]
      }
    }
    
    await ctx.model.MultipleTests.findAndCountAll({
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

module.exports = MultipleTestsService;

