const https = require('https');
const fs = require('fs');

let options = {
    key: fs.readFileSync('ssh_key.pem'),
    cert: fs.readFileSync('ssh_cert.petm')
}

https.createServer(options,function(req,res){
    res.writeHead(200);
    res.end('hello imooc');
}).listen(8090);