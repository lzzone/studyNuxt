const KoaRouter = require("koa-router");
// const wechatRouter = require("./wechat.js");
const ToolMethod = require("../../toolMethods/index.js");
const koaRouter = new KoaRouter();
var config = require("../../config/index.js");
// var crypto = require("crypto");
var sha1 = require("sha1");
// var hash = crypto.createHash('sha1');
var toolMethods = new ToolMethod();
var Wechat = require("../../wechat/index.js");

function router(app){
    koaRouter.get("/wechatVervify",function(ctx,next){
        // console.log( toolMethods.getRamdomString(10) );
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
    });
    koaRouter.post("/wechatVervify",function(ctx,next){
        var wechat = new Wechat();
    })

    app
    .use( koaRouter.routes() )
    .use( koaRouter.allowedMethods() );

}

module.exports = router