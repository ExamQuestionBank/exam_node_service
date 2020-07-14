'use strict';


module.exports = () => {
  return async function(ctx, next) {
    const VER = await ctx.helper.verifyToken();
    if (VER) {
      console.log(ctx);
      await next();
    }
  };
};
