var Auth = require("../../wechat/Authorization.js");
var auth = new Auth();
function authRouter(Router){
    var koaRouter = new Router();
    // 获取用户的openid 
    // koaRouter.get("/auth",async function(ctx,next){
    //     await auth.auth(ctx,next);
    // })

    // koaRouter.get("/snsapiBase",async function(ctx,next){
    //     await auth.snsapiBase(ctx,next);
    // })
    // 获取用户信息 authUserInfo   测试这个功能要把自定义菜单的按钮改回来
    koaRouter.get("/authUserInfo",async function(ctx,next){
        await auth.auth(ctx,next);
    })

    koaRouter.get("/snsapiUserInfo",async function(ctx,next){
        await auth.snsapiBase(ctx,next);
    })

    return koaRouter
}
module.exports = authRouter

    
