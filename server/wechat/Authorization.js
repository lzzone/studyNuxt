var Tool = require("../toolMethods/index.js");
var JsTicket = require("../wechat/jssdk.js");
var sha1 = require("sha1");
var config = require("../config/index.js");
var jsTicket = new JsTicket();
var rq = require("request-promise");
var tool = new Tool();
class Auth {
    constructor(){

    }
    async snsapiBase(ctx,next){
        var code = ctx.query.code;
        var accessToken = await this.getAccessToken(code);
        accessToken = JSON.parse( accessToken );
        // 使用这个只能拿openid是拿不到用户信息的
        // var userInfo = await this.getUserInfo( accessToken.access_token,accessToken.openid );
        // console.log(userInfo);
        ctx.body = accessToken.openid;
    }
    async snsapiUserInfo(ctx,next){
        console.log( ctx.query );
        var code = ctx.query.code;
        var accessToken = await this.getAccessToken(code);
        accessToken = JSON.parse( accessToken );
        var userInfo = await this.getUserInfo( accessToken.access_token,accessToken.openid );
        console.log(userInfo);
        ctx.body = userInfo;
    }
    // 获取openid  scope为snsapi_base
    auth(ctx,next){
        var url = encodeURIComponent( `${config.url}/auth/snsapiBase` );
        ctx.redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appID}&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`);
    }
    // 获取用户信息  scope为snsapi_userinfo
    authUserInfo( ctx,next ){
        var url = encodeURIComponent( `${config.url}/auth/snsapiUserInfo` );
        ctx.redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appID}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`);
    }
    // 通过code拿accessToken
    getAccessToken(code){
        var json = {
            uri: "https://api.weixin.qq.com/sns/oauth2/access_token",
            qs: {
                appid: `${config.appID}`,
                secret: `${config.appsecret}`,
                code: code,
                grant_type: "authorization_code"
            }
        }
        return rq(json);
    }
    getUserInfo(accessToken,openId){
        var json = {
            uri: "https://api.weixin.qq.com/sns/userinfo",
            qs: {
                "access_token": accessToken,
                "openid": openId,
                "lang": "zh_CN"
            }
        }
        return rq( json );
    }
}
module.exports = Auth;