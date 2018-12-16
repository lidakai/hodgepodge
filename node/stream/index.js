const fs = require('fs');
let stream = fs.readFileSync('../images/favicon.png');

fs.writeFileSync('../images/stream_copy_logo.png',stream);