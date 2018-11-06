var Webapp = require("../../wechat/embeddedWebpage.js");
var webapp = new Webapp();
function webappRequest(KoaRouter){
    var webappRouter = new KoaRouter();
    webappRouter.post("/signature",async function(ctx,next){
        // console.log( "执行post" );
        await webapp.buildInPage(ctx,next);
    })
    return webappRouter
}

    
module.exports = webappRequest;