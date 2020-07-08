'use strict';

module.exports = () => {
  return async function(ctx, next) {
    const VER = await ctx.helper.verifyToken();
    if (VER) {
      await next();
    }
  };
};
