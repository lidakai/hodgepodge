'use strict';
const mysql  = require( 'mysql' );

var pool = mysql.createConnection({
  connectionLimit: 50,
  host: "47.99.240.192",  //ip
  user: "root", //数据库名
  password: "likai360",  //数据库密码
  database: "test", //数据库名字
  multipleStatements: true //是否允许执行多条sql语句
});
// pool.connect(function(resolve,reject){
//     console.log(resolve);
//     console.log(reject);
//     console.log('-----------------------')
// });
//将结果已对象数组返回
var row=( sql , ...params)=>{
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
                return; 
            }
            connection.query( sql , params , function(error,res){
                connection.release();
                if(error){
                    reject(error);
                    return;
                }
                resolve(res);
            });
        });
    });
};
//返回一个对象
var first=( sql , ...params )=>{
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
                return; 
            }
            connection.query( sql , params , function(error,res){
                connection.release();
                if(error){
                    reject(error);
                    return;
                }
                resolve( res[0] || null );
            });
        });
    });
};
//返回单个查询结果
var single=(sql , ...params )=>{
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
                return; 
            }
            connection.query( sql , params , function(error,res){
                connection.release();
                if(error){
                    reject( error );
                    return;
                }
                for( let i in res[0] )
                {
                    resolve( res[0][i] || null );
                    return;
                }
                resolve(null);
            });
        });
    });
}
//执行代码，返回执行结果
var execute=(sql , ...params )=>{
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
                return; 
            }
            connection.query( sql , params , function(error,res){
                connection.release();
                if(error){
                    reject(error);
                    return;
                }
                resolve( res );
            });
        });
    });
}

//模块导出
module.exports = {
    ROW     : row ,
    FIRST   : first ,
    SINGLE  : single ,
    EXECUTE : execute 
}