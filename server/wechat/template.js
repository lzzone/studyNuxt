// { ToUserName: [ 'gh_e3d427864501' ],
//   FromUserName: [ 'o_bhA5hRLM0FUTnVgCtR1wBGPLkM' ],
//   CreateTime: [ '1539418469' ],
//   MsgType: [ 'text' ],
//   Content: [ '1' ],
//   MsgId: [ '6611751979635950153' ] }
var heredoc = require("heredoc");
var ejs = require("ejs");
function template(ctx,msg){
    var wechat = ctx.wechat;
    var templateMsg = msg;
    templateMsg.CreateTime = Math.floor( ( new Date().getTime() ) / 1000 );
    var str = heredoc.strip(function() {/*
        <xml>
            <ToUserName><![CDATA[<%=templateMsg.FromUserName[0]%>]]></ToUserName>
            <FromUserName><![CDATA[<%=templateMsg.ToUserName[0]%>]]></FromUserName>
            <CreateTime><%=templateMsg.CreateTime%></CreateTime>
            <MsgType><![CDATA[<%=templateMsg.MsgType %>]]></MsgType>
            <% if( templateMsg.MsgType == "text" ){ %>
            <Content><![CDATA[<%=templateMsg.Content %>]]></Content>
            <MsgId><![CDATA[<%=templateMsg.MsgId[0] %>]]></MsgId>
            <% } else if( templateMsg.MsgType == "image" ){  %>
            <Image>
                <MediaId><![CDATA[<%=templateMsg.MediaId[0] %>]]></MediaId>
            </Image>
            <% } %>
        </xml>
    */})

    var template = ejs.render( str, {
        templateMsg: templateMsg
    } );

    //或者
    //    var template = ejs.compile( str );
    //    var str = template({
    //      templateMsg: templateMsg
    //    })
    //

    return template
}

module.exports = template;