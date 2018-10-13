var rp = require("request-promise");
var query = require("../database/index.js");
class AccessToken {
    constructor(){
        this.appID = "wx893e176e34330b72";
        this.appsecret = "109d5c5572d0a7a43d74b68b89db244c";
        this.vertifyAccessToken();
    }
    // 获取微信access_token并存到本地
    async getAccessToken(){
        var options = {
            method: 'GET',
            uri: 'https://api.weixin.qq.com/cgi-bin/token',
            qs: {
                "grant_type": "client_credential",
                "appid": this.appID,
                "secret": this.appsecret
            }
        };

        rp(options)
        .then( async function (res) {
            console.log(res);
            res = JSON.parse( res );
            if( res.access_token ) {
                res.expires_in =  Math.floor( ( new Date().getTime() ) / 1000 ) + 7200 - 20;    //过期时间
                var sql = "UPDATE access_token_t SET access_token = ?,expires_in = ?,create_time = ?";
                var updateData = [ res.access_token,res.expires_in, Math.floor( ( new Date().getTime() ) / 1000 ) ];

                var updateResult = await query( sql,updateData );

                if( updateResult.changedRows == 0 ) {  //改变行数是0，没有查到要修改的东西，就添加。这里可以用async/await，但是现在不想用

                    var sqlAdd = "INSERT INTO access_token_t(access_token,expires_in,create_time) value (?,?,?)";
                    await query(sqlAdd,updateData)
                    return updateData           //返回更新的数据
                }
                console.log(updateResult);

            }else {
                console.log("accessToken.js:获取失败");
                return
            }
        })
        .catch(function (err) {
            console.log("accessToken.js:获取accessToken失败");
            console.log(err);
        });

    }
    async vertifyAccessToken(){
        var sqlSelect = "SELECT * FROM access_token_t";
        var getQueryResult = await query( sqlSelect,"" );
        console.log("执行验证")
        var getNowTime = Math.floor( ( new Date().getTime() ) / 1000 );
        if( getQueryResult.expires_in < getNowTime ) {
            this.getAccessToken();
        }else {
            return new Promise( (res)=>{
                res(getQueryResult)
            } )
        }

    }
}

module.exports = AccessToken;