
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
    // 格式化时间xxxx-xx-xx格式
    formatTime(HMS){
        //HMS 0是不用时分秒，1是时，2是分，3是秒
        var date = new Date();
        var getYear = date.getFullYear();
        var getMonth = date.getMonth()+1;
        var getDate = date.getDate();
        var getHours = date.getHours();
        var getMinutes = date.getMinutes();
        var getSeconds = date.getSeconds();
        var HMSArr = [getYear,getMonth,getDate,getHours,getMinutes,getSeconds ];
        var str = "";
        for( var i = 1;i<=HMS;i++ ){
            str +=  `${HMSArr[i-1]}-`;
            if( i == HMS ) {
                str = str.slice( 0,str.length-1 );
            }
        }
        return str;
    }
}

module.exports = Tool