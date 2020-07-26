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
  router.post('/api/singleTests/saveOrUpdate', IsLogin, controller.singleTests.saveOrUpdate);
  router.post('/api/singleTests/getSingleTests', IsLogin, controller.singleTests.getSingleTests);
  router.post('/api/singleTests/deleteTests', IsLogin, controller.singleTests.deleteSingleTests);
  router.post('/api/userSingleTests/saveOrUpdate', IsLogin, controller.userSingleTests.saveOrUpdate);
  router.post('/api/userSingleTests/getUserSingleTest', IsLogin, controller.userSingleTests.getUserSingleTest);
};
