
var config = require("../config/index.js");
var sha1 = require("sha1");
var AccessToken = require("./accessToken.js");
var reply = require("./reply.js");
var template = require("./template.js");
function WechatReply(){

    return async function (ctx,next){
        if( ctx.method == "GET" ) {
            var query = ctx.query;
            console.log( query );
            var token = config.Token;
            var timestamp = query.timestamp;
            var nonce = query.nonce;
            var vervifyArr = [token,timestamp,nonce].sort();
            vervifyArr = vervifyArr.join("");
            var vervifyArrSha1 = sha1( vervifyArr )
            if( query.signature == vervifyArrSha1 ) {
                ctx.body = query.echostr;
            }else {
                return false
            }
        }else if( ctx.method == "POST" ) {
            var accessTokenInfo = new AccessToken();
            var getData = await accessTokenInfo.vertifyAccessToken();
            console.log( ctx.request.body );
            // 制定回复策略
            reply( ctx,ctx.request.body.xml );
            // 根据模板生成返回xml
            var replyTemplate = template( ctx,ctx.request.body.xml );
            console.log("生成的模板");
            console.log( replyTemplate )
            ctx.type = "application/xml";
            ctx.body = replyTemplate;
        }

    }

}

module.exports = WechatReply;