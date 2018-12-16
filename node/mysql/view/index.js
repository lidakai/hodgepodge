const { EXECUTE } = require('../mysql.js');

(async ()=>{
    let sql = "SELECT * FROM user";
    let s = await EXECUTE(sql,params = '');
    console.log(s);
})();