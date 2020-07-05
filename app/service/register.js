'use strict';

const Service = require('egg').Service;
const { cryptoMd5 } = require('../extend/helper');


class RegisterService extends Service {
  async userRegister(options) {
    const { ctx } = this;
    const { username, password } = options;
    const keys = this.config.keys;
    let results = null;
    ctx.coreLogger.info('111111111');
    await ctx.model.User.findOne({
      where: {
        username, // 查询条件
      },
    }).then(async result => {
      if (!result) {
        options.password = await cryptoMd5(password, keys);
        await ctx.model.User.create(options).then(res => {
          results = {
            code: 200,
            message: '注册成功',
            res,
          };
        }).catch(err => {
          results = {
            code: 10000,
            message: err,
          };
        });
      } else {
        results = {
          code: 10000,
          message: '该账号已存在',
        };
      }
    });

    return results;
  }
}
module.exports = RegisterService;
