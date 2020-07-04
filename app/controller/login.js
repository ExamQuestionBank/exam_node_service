'use strict';

const Controller = require('egg').Controller;
const { cryptoMd5 } = require('../extend/helper');

class LoginController extends Controller {
  async userLogin() {
    const { username, password } = this.ctx.request.body;
    const keys = this.config.keys;
    let res = null;
    const user = await this.ctx.service.login.findUsername(username);
    if (!user) {
      res = {
        code: 10000,
        message: '用户名不存在',
      };
    } else {
      const newPass = await cryptoMd5(password, keys);
      if (user.password !== newPass) {
        res = {
          code: 10000,
          message: '密码错误',
        };
      } else {
        const refresh_token = await this.ctx.helper.createToken({ id: user.id }, '7', 'days');
        const access_token = await this.ctx.helper.createToken({ id: user.id }, '2', 'hours');
        const uid = user.id;
        await this.ctx.service.admin.login.saveToken({ uid, access_token, refresh_token });
        res = {
          code: 200,
          data: {
            access_token,
          },
        };
      }
    }
    this.ctx.body = res;
  }
}

module.exprots = LoginController;
