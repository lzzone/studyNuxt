/*
* @Author: Marte
* @Date:   2018-11-02 10:18:54
* @Last Modified by:   Marte
* @Last Modified time: 2018-11-02 15:03:17
*/

'use strict';
var Tool = require("../toolMethods/index.js");
var JsTicket = require("../wechat/jssdk.js");
var sha1 = require("sha1");
var config = require("../config/index.js");
var jsTicket = new JsTicket();
var zlib = require("zlib");
var axios = require("axios");
var tool = new Tool();
var api = {
    // 内嵌页面获取授权
    auth: async function(ctx,next){
        var url = encodeURIComponent( `${config.url}/authRedirectCode` );
        ctx.redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appID}&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`);
    },
    // 内嵌页面返回签名，时间戳，随机字符串，jsticket
    buildInPage: async function(ctx,next){
        // 签名部分
        var query = ctx.request.body.url;
        var noncestr = tool.getRamdomString(8);
        var timestamp = parseInt( new Date().getTime() / 1000 )
        var jsapi_ticket = await jsTicket.init();
        jsapi_ticket = jsapi_ticket.jsTicket;
        var url = `${config.url}${query}`;
        // 要按照下面的格式，不是使用[nonceStr,event.timestamp,jsapi_ticket,url]这样的格式，需要带有&和key名
        var vertifyArr = [ "noncestr="+noncestr,"timestamp="+timestamp,"jsapi_ticket="+jsapi_ticket,"url="+url ].sort().join("&");
        var signature = sha1( vertifyArr );
        var json = {
            appId: config.appID,
            timestamp: timestamp,
            nonceStr: noncestr,
            signature: signature,
        }
        ctx.body = json;
    },
    authRedirectCode: function(ctx,next){
        console.log(ctx.query);
        ctx.body = `拿到code,${ctx.query.code}`;
    }
}

module.exports = api;