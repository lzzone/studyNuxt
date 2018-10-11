var rp = require("request-promise");

class AccessToken {
    constructor(){
        this.appID = "wx893e176e34330b72";
        this.appsecret = "109d5c5572d0a7a43d74b68b89db244c";
    }
    getAccessToken(){
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
        .then(function (res) {
            console.log(res);
        })
        .catch(function (err) {
            console.log("accessToken.js:获取accessToken失败");
            console.log(err);
        });

    }
}

module.exports = AccessToken;