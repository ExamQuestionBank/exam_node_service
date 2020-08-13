/*
 * @Author: your name
 * @Date: 2020-07-03 12:03:14
 * @LastEditTime: 2020-08-12 20:11:33
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /exam_node_service/app/router.js
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = async app => {
  const { router, controller, middleware } = app;
  const IsLogin = middleware.verifyToken();
  router.get('/', controller.home.index);
  router.post('/api/user/register', controller.register.userRegister);
  router.post('/api/user/login', controller.login.userLogin);
  router.post('/api/wechat/wechatLogin', controller.wechat.wechatLogin);
  router.post('/api/user/currentUser', IsLogin,controller.login.getCurrentUser);
  router.post('/api/singleTests/saveOrUpdate', IsLogin, controller.singleTests.saveOrUpdate);
  router.post('/api/singleTests/getSingleTests', IsLogin, controller.singleTests.getSingleTests);
  router.post('/api/singleTests/deleteTests', IsLogin, controller.singleTests.deleteSingleTests);
  router.post('/api/userSingleTests/saveOrUpdate', IsLogin, controller.userSingleTests.saveOrUpdate);
  router.post('/api/userSingleTests/getUserSingleTest', IsLogin, controller.userSingleTests.getUserSingleTest);
  router.post('/api/userSingleTests/getUserFinishedTest', IsLogin, controller.userSingleTests.getUserFinishedTest)
};
