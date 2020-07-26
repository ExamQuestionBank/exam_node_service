'use strict';

const Service = require('egg').Service;

class UserSingleTests extends Service {
  async saveOrUpdate(data,isUpdate) {
    let res = null;
      try {
        if (isUpdate) {
          res = await this.ctx.model.UserSingleTests.update(data,{
            where:{
              userId:data.userId,
              testId:data.testId,
            }
          });
        } else {
          res = await this.ctx.model.UserSingleTests.upsert(data);
        }
      } catch (err) {
        res = err
      }
    return res;
  }

  async getUserSingleTest(params) {
    const {ctx} = this;
    let res = null;
    await ctx.model.UserSingleTests.findAll({
      where:{
        userId:params.userId,
        testId:params.testId,
      }
    }).then(reslut => {
      res = reslut;
    }).catch(err => {
      res = {
        status: 'error',
        message: err,
      };
    })
    return res;
  }
}

module.exports = UserSingleTests;