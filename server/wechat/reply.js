   // { ToUserName: [ 'gh_e3d427864501' ],
   //   FromUserName: [ 'o_bhA5hRLM0FUTnVgCtR1wBGPLkM' ],
   //   CreateTime: [ '1539418469' ],
   //   MsgType: [ 'text' ],
   //   Content: [ '1' ],
   //   MsgId: [ '6611751979635950153' ] }

function reply(ctx,msg){
    var msgType = msg.MsgType[0];
    var ctxW = ctx.wechat = msg;
    // 文本回复
    if( msgType == "text" ) {
        ctxW.Content = msg.Content[0];
        ctxW.MsgType = msgType;
    }
    // 图片回复
    else if( msgType == "image" ){
        // ctxW.Content = msg.Content[0];
        ctxW.MsgType = msgType;
    }
    // 事件
    else if( msgType == "event" ) {
        // 用户关注的事件
        if( msg.Event[0] == "subscribe" ) {
            ctxW.MsgType = "text";
            ctxW.Content = "关注成功";
        }
        // 用户取消关注的事件
        else if( msg.Event[0] == "unsubscribe" ) {
            ctxW.MsgType = "text";
            ctxW.Content = "取消关注成功";
            console.log("用户取消关注");
        }
    }

}

module.exports = reply