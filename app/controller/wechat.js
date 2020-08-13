/*
 * @Author: Terence
 * @Date: 2020-08-11 21:56:35
 * @LastEditTime: 2020-08-12 22:17:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /exam_node_service/app/controller/wechat.js
 */
'use strict';

const Controller = require('egg').Controller;

class WechatController extends Controller {
  async wechatLogin() {
    let wechatOpenIdResult = await this.getWechatOpenId();
    if (wechatOpenIdResult && wechatOpenIdResult.openid) {
      let res = await this.wechatLoginWithOpenid(wechatOpenIdResult.openid);
      this.ctx.body = res;
    } else {
      this.ctx.body = wechatOpenIdResult;
    }
  }

  async getWechatOpenId() {
    let res = null;
    const { ctx } = this;
    const data = ctx.request.body;
    const params = {
      appid: this.app.config.wechat.appid,
      appSecret: this.app.config.wechat.appSecret,
      jsCode: data.code,
      grantType: 'authorization_code'
    }
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${params.appid}&secret=${params.appSecret}&js_code=${params.jsCode}&grant_type=${params.grantType}`
    const result = await ctx.curl(url,{
      dataType: 'json',
      method:"GET"
    })
    if (result.data.errmsg) {
      res = {
        status: 101,
        errcode: result.data.errcode,
        errmsg: result.data.errmsg
      }
    } else {
      res = {
        status: 200,
        sessionKey: result.data.session_key,
        openid: result.data.openid
      }
    }
    return res
  }

  async wechatLoginWithOpenid (openid,sessionKey) {
    const { ctx } = this;
    const user = await ctx.service.wecaht.findUserByOpenid(openid);
    if (!user) {
      this.wechatRegiste(openid)
    } else {
      return this.login (openid)
    }
  }

  async wechatRegiste (openid) {
    const results = await this.service.wecaht.wechatRegiste(openid);
    if (results.code === 200) {
      this.login (openid)
    } else {
      this.ctx.body = results;
    }
  }

  async login (openid){
    let res = null;
    const keys = this.config.keys;
    const { ctx } = this;
    const refresh_token = await ctx.helper.createToken({ id: openid }, '7', 'days');
    const access_token = await ctx.helper.createToken({ id: openid }, '2', 'hours');
    const user = await ctx.service.wecaht.findUserByOpenid(openid);
    const uid = user.id;
    try {
      await this.ctx.service.login.saveToken({ uid, access_token, refresh_token });
      res = {
        status: 'ok',
        code: 200,
        data: {
          access_token,
          username: user.username,
          user:{
            id: user.id,
            username: user.username,
            openid: user.openid
          }
        },
      };
    } catch (err) {
      res = {
        code: 10000,
        message: err,
      };
    }
    return res
  }

}

module.exports = WechatController;
