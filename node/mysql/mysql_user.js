var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "47.99.240.192",  //ip
  user: "root", //数据库名
  password: "likai360",  //数据库密码
  database: "test" //数据库名字
});

connection.connect();

connection.query("SELECT * FROM user", function(error, results, fields) {
  if (error) throw error;
  console.log(results);
});
