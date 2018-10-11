var AccessToken = require("./accessToken.js");
//   var accessToken = new AccessToken();  如果在这里new对象，再在constructor里面使用就会出现报错，因为没有在constructor里面new的话就是undefined
class Wechat {
    constructor(){
        this.accessToken = new AccessToken();
        this.accessToken.getAccessToken();
    }

}

module.exports = Wechat;