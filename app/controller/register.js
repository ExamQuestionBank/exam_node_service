'use strict';

const Controller = require('egg').Controller;

class RegisterController extends Controller {
  // 用户注册
  async userRegister() {
    const RegData = this.ctx.request.body;
    if (!RegData.name) {
      // 如果真实名字为空,默认使用用户名
      RegData.name = RegData.username;
    }
    const Results = await this.service.register.userRegister(RegData);
    this.ctx.body = Results;
  }

}

module.exports = RegisterController;
