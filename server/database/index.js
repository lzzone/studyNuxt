var mysql = require("mysql");

class Mysql {
    constructor(){
        var connection = mysql.createConnection({
          host     : 'localhost',
          user     : 'root',
          password : '123456',
          database : 'studynuxt'
        });

        connection.connect();
    }
}

module.exports = Mysql;