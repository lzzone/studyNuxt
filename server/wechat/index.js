
var config = require("../config/index.js");
var sha1 = require("sha1");
var AccessToken = require("./accessToken.js");

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
            // hash.update(vervifyArr);
            // var vervifyArrSha1 = hash.digest('hex');
            var vervifyArrSha1 = sha1( vervifyArr )
            if( query.signature == vervifyArrSha1 ) {
                ctx.body = query.echostr;
            }else {
                return false
            }
        }else if( ctx.method == "POST" ) {
            var accessTokenInfo = await new AccessToken();
            console.log("打印获取的accesstoken信息");
            console.log( accessTokenInfo );
            console.log( accessTokenInfo.vertifyAccessToken() )
            // this.accessToken.getAccessToken();
        }

    }

}

module.exports = WechatReply;