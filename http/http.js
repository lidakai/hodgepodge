let http = require('http');

http
    .createServer(function(req,res){
        res.writeHead(200 , {'Content-Type':'text/plain'});
        res.write('hello word');
        res.end();
    })
    .listen(2018)