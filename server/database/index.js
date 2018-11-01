var mysql = require("mysql");

var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'studynuxt'
});

function query(sql,value){

    return new Promise( (res,rej)=>{

        pool.getConnection( function(err,connection){
            if(err) {
                console.log("连接数据库失败");
                rej(err)
            }else {
                connection.query( sql,value,function(err,result){
                    if(err) {
                        rej(err);
                    } else {
                        res(result);
                    }
                    connection.release();
                } )
            }

        } )

    } )

}

module.exports = query;