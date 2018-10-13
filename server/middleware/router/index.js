const KoaRouter = require("koa-router");
const koaRouter = new KoaRouter();

var Wechat = require("../../wechat/index.js");

function router(app){

    koaRouter.all("/wechatVervify",Wechat());

    app
    .use( koaRouter.routes() )
    .use( koaRouter.allowedMethods() );

}

module.exports = router