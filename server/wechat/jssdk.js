var AT = require("./accessToken.js");
var Tool = require("../toolMethods/index.js");
var tool = new Tool();
var rq = require("request-promise");
var query = require("../database/index.js");
class JsTicket{
    constructor(){
        this.baseUrl = "https://api.weixin.qq.com/cgi-bin/ticket/getticket";
    }
    async init(){
        // 获取数据库的jsticket
        var getLocalData = await this.getLocalJsTicket();
        if( getLocalData.length == 0 ) {
            // 没有拿到数组说明这时数据库没有存到数据,这时要执行插入新数据的操作
            var getJsTiket = await this.getJsTiket();
            console.log(getJsTiket);
            this.insertTicket( JSON.parse( getJsTiket ) );
            return getJsTiket
        }else {
            if( this.vervifyTicket( getLocalData[0].expires_in ) ) {
                return getLocalData[0]
            }else {
                var getJsTiketR = await this.getJsTiket();
                console.log("更新jsticket");
                getJsTiketR = JSON.parse( getJsTiketR )
                getJsTiketR.jsTicket = getJsTiketR.ticket;
                this.updateJsTiket( getJsTiketR );
                return getJsTiketR
            }
        }
    }
    getLocalJsTicket(){
        var sql = "SELECT * FROM jsTicket_t";
        return query(sql,"");
        // return queryResult
    }
    async getJsTiket(){
        var accessToken = await new AT().vertifyAccessToken();
        // console.log( accessToken );
        var json = {
            uri: this.baseUrl,
            qs: {
                "access_token": accessToken.access_token,
                "type": "jsapi"
            }
        };
        return rq(json);
    }
    async insertTicket(ticket) {
        var create_time = parseInt ( new Date().getTime() / 1000 );
        var expires_in = create_time + ticket.expires_in - 20;
        var formatTime = tool.formatTime(6);
        var sql = "INSERT INTO jsTicket_t ( jsTicket , expires_in , create_time , create_time_format ) value ( ? , ? , ? , ? )";
        var value = [ticket.ticket,expires_in,create_time,formatTime];
        return query( sql,value );
    }
    async updateJsTiket(ticket){
        var create_time = parseInt ( new Date().getTime() / 1000 );
        var expires_in = create_time + ticket.expires_in - 20;
        var formatTime = tool.formatTime(6);
        var sql = "UPDATE jsTicket_t SET jsTicket = ?,expires_in = ?,create_time = ?,create_time_format = ?";
        var value = [ticket.ticket,expires_in,create_time,formatTime];
        return query( sql,value );
    }
    vervifyTicket( expires_in ){
        var getTime = parseInt( new Date().getTime() / 1000 );
        if( getTime < expires_in ) {
            return true  //不用获取新的jsticket
        } else if ( getTime >= expires_in ) {
            return false   //需要获取新的jsticket
        }
    }
}

module.exports = JsTicket