const fs = require('fs');

//边读边写入
const readStream = fs.createReadStream('../../8.mp4'); //读取

const writeStream = fs.createWriteStream('8-stream.mp4'); //创建并写入

readStream.on('data',function(chunk){
   if(writeStream.write(chunk) === false){
       //当缓存溢出、暂停写入
       console.log('still cachd');
       readStream.pause();
   };
})

readStream.on('end',function(){
    writeStream.end();
})

writeStream.on('drain',function(){
    //当前待写入的数据全部写入完毕，可以继续缓存； 
    readStream.resume();
})