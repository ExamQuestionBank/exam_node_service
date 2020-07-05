'use strict';
const Crypto = require('crypto');

module.exports = {
  createToken(data, expires, strTimer) {
    return this.app.jwt.sign(data, this.app.config.jwt.secret, {
      expiresIn: expires + ' ' + strTimer,
    });
  },

  getAccessToken() {
    const BearerToken = this.ctx.request.header.authorization;
    return BearerToken && BearerToken.replace('Bearer', '');
  },

  async verifyToken() {
    let result = false;
    const That = this;
    const Token = this.getAccessToken();
    const Verify = await function(token) {
      const RES = {};
      That.app.jwt.verify(token, That.app.config.jwt.secret, function(err, decoded) {
        if (err) {
          RES.verify = false;
          RES.message = err.message;
        } else {
          RES.verify = true;
          RES.message = decoded;
        }
      });
      return RES;
    };
    const VerifyRes = Verify(Token);
    const TokenInfo = await this.ctx.service.login.findToken(Token);

    if (!VerifyRes.verify) {
      if (TokenInfo) {
        if (!(TokenInfo.refresh_token).verify) {
          await this.error(401, 200, 'token身份认证失效,请重新登');
        } else {
          const RefreshToken = await this.createToken({ id: TokenInfo.uid }, '7', 'days');
          const AccessToken = await this.createToken({ id: TokenInfo.uid }, '2', 'hours');
          const { ID, UID } = { ID: TokenInfo.id, UID: TokenInfo.uid };
          await this.ctx.service.login.saveToken({ ID, UID, AccessToken, RefreshToken });
          await this.error(200, 11000, AccessToken);
        }
      } else {
        await this.error(401, 200, 'token身份认证失效,请重新登录');
      }
    } else {
      if (TokenInfo) {
        result = true;
      } else {
        this.error(401, 200, '该账号已在其他地方登陆,请重新登录');
      }
    }
    return result;
  },

  async cryptoMd5(password, key) {
    const Hash1 = await Crypto.createHash('md5').update(password).digest('hex');
    const Hash2 = await Crypto.createHash('md5').update(Hash1 + key).digest('hex');
    return Hash2;
  },

  // 处理失败响应
  error(status, code, message) {
    this.ctx.body = {
      code,
      message,
    };
    this.ctx.status = status;
  },
};
