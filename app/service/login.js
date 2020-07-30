'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  async findUserName(username) {
    const USER = await this.ctx.model.User.findOne({
      where: { username },
    });
    return USER;
  }

  async saveToken(data) {
    await this.ctx.model.Token.upsert(data);
  }

  async findToken(access_token) {
    const TOKENINFOR = await this.ctx.model.Token.findOne({
      where: {
        access_token,
      },
    });
    return TOKENINFOR;
  }

  async findUserNameById(id) {
    const USER = await this.ctx.model.User.findOne({
      where: { id },
    });
    return USER;
  }

}

module.exports = LoginService;

