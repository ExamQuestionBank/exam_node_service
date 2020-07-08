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
};
