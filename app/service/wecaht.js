/*
 * @Author: Terence
 * @Date: 2020-08-12 17:57:21
 * @LastEditTime: 2020-08-12 20:57:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /exam_node_service/app/service/wecaht.js
 */
'use strict';

const Service = require('egg').Service;
const { cryptoMd5 } = require('../extend/helper');


class WecahtService extends Service {
  async findUserByOpenid (openid) {
    const USER = await this.ctx.model.User.findOne({
      where: { openid },
    });
    return USER;
  }

  async wechatRegiste (openid) {
    const { ctx } = this;
    const keys = this.config.keys;
    let results = null;
    let options = {}
    await ctx.model.User.findOne({
      where: {
        openid, // 查询条件
      },
    }).then(async result => {
      if (!result) {
        options.password = await cryptoMd5(openid, keys);
        options.username = openid;
        options.openid = openid;
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

module.exports = WecahtService;
