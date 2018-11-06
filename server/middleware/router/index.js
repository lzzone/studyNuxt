const KoaRouter = require("koa-router");
const koaRouter = new KoaRouter();
const koaBodyParser = require("koa-bodyparser");
const koaXmlBody = require("koa-xml-body");
var Wechat = require("../../wechat/index.js");
// var api = require("../../api/index.js");
var webappRequest = require("./embeddedWebpage.js");
var auth = require("./auth.js");
function router(app){
    app.use( koaXmlBody() )
    app.use(koaBodyParser());

    koaRouter.all("/wechatVervify",Wechat());
    // koaRouter.get("/auth",api.auth);
    // koaRouter.get("/authRedirectCode",api.authRedirectCode);
    // koaRouter.post("/BuiltInPage",api.buildInPage);
    // koaRouter.all( "/auth",auth( koaRouter ) );
    // koaRouter.all( "/webapp",webappRequest(koaRouter) );

    // 微信内嵌网页的相关路由
    var webapp = webappRequest(KoaRouter);
    koaRouter.use("/webapp",webapp.routes(),webapp.allowedMethods());

    // 获取微信授权的相关路由
    var getAuthRouter = auth(KoaRouter);
    koaRouter.use("/auth",getAuthRouter.routes(),getAuthRouter.allowedMethods());

    app
    .use( koaRouter.routes() )
    .use( koaRouter.allowedMethods() );

}

module.exports = router

//     /webapp/signature