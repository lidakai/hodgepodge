const http = require("http");

const fs = require("fs");

http
  .createServer(function(req, res) {
    fs.createReadStream("../node/images/favicon.png").pipe(res);
  })
  .listen(8090);
