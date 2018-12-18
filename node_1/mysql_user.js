var mysql = require("mysql");

function getConnection(){
  var connection = mysql.createConnection({
    host: "47.99.240.192",  //ip
    user: "root", //数据库名
    password: "likai360",  //数据库密码
    database: "test" //数据库名字
  });
  
  connection.connect();

  return connection;
}


module.exports = {
  CN: getConnection
}