/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'TESTDB',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '123456',
  };

  config.jwt = {
    secret: '_123654_720',
    enable: false,
  };

  config.security = {
    csrf: { enable: false },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_123654_720';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
