'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  async findUserName(username) {
    const USER = await this.ctx.model.USER.findOne({
      where: { username },
    });
    return USER;
  }

  async saveToken(data) {
    await this.app.model.SystemToken.upsert(data);
  }

  async findToken(access_token) {
    const TOKENINFOR = await this.ctx.model.SystemToken.findOne({
      where: {
        access_token,
      },
    });
    return TOKENINFOR;
  }

}

module.exports = LoginService;

