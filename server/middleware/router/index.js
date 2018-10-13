const KoaRouter = require("koa-router");
const koaRouter = new KoaRouter();
const koaBodyParser = require("koa-bodyparser");
const koaXmlBody = require("koa-xml-body");
var Wechat = require("../../wechat/index.js");

function router(app){
    app.use( koaXmlBody() )
    app.use(koaBodyParser());

    koaRouter.all("/wechatVervify",Wechat());

    app
    .use( koaRouter.routes() )
    .use( koaRouter.allowedMethods() );

}

module.exports = router