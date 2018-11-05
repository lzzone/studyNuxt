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
var rq = require("request-promise");
var tool = new Tool();
var api = {
    // 内嵌页面返回签名，时间戳，随机字符串，jsticket
    buildInPage: async function(ctx,next){

        var json = {
            uri: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=&redirect_uri=&response_type=code&scope=snsapi_base&state=123ABC#wechat_redirect`,
            method: "GET",
            qs: {
                "appid": `${config.appID}`,
                "redirect_uri": "/test",
                "response_type": "code",
                "scope": "snsapi_base",
                "state": "123ABC#wechat_redirec",
            }
        }

        var getData = await rq(json);
        console.log( getData );
        
        ctx.set('Content-Type','text/html');

        ctx.body = getData;

        // var query = ctx.request.body.url;
        // var noncestr = tool.getRamdomString(8);
        // var timestamp = parseInt( new Date().getTime() / 1000 )
        // var jsapi_ticket = await jsTicket.init();
        // jsapi_ticket = jsapi_ticket.jsTicket;
        // var url = `${config.url}${query}`;
        // console.log( url );
        // // 要按照下面的格式，不是使用[nonceStr,event.timestamp,jsapi_ticket,url]这样的格式，需要带有&和key名
        // var vertifyArr = [ "noncestr="+noncestr,"timestamp="+timestamp,"jsapi_ticket="+jsapi_ticket,"url="+url ].sort().join("&");
        // console.log(vertifyArr);
        // var signature = sha1( vertifyArr );
        // var json = {
        //     appId: config.appID,
        //     timestamp: timestamp,
        //     nonceStr: noncestr,
        //     signature: signature,
        // }
        // console.log(json);
        // ctx.body = json;
    }
}

module.exports = api;