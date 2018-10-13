   // { ToUserName: [ 'gh_e3d427864501' ],
   //   FromUserName: [ 'o_bhA5hRLM0FUTnVgCtR1wBGPLkM' ],
   //   CreateTime: [ '1539418469' ],
   //   MsgType: [ 'text' ],
   //   Content: [ '1' ],
   //   MsgId: [ '6611751979635950153' ] }

function reply(ctx,msg){
    var msgType = msg.MsgType[0];
    ctx.wechat = {};
    if( msgType == "text" ) {
        ctx.wechat.Content = msg.Content[0];
        ctx.wechat.MsgType = msgType;
    }
}

module.exports = reply