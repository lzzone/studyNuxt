
class Tool {
    constructor(){

    }
    getRamdomString( num ){   //获取随机字符串，num是需要几位的字符串
        var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var strLength = str.length;
        var ramdomStr = "";
        if( !parseInt( num ) ) {
            console.log("传入的参数不是正整数")
            return;
        }
        for( var i = 0; i < num; i++ ) {
            ramdomStr += str.substr( Math.floor( Math.random()*strLength ),1)
        }
        return ramdomStr
    }
}

module.exports = Tool