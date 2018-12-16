const http = require('http');
const querystring = require('querystring');

let postData = querystring.stringify({
    comment: 'test6666',
    comment_post_ID: 150,
    comment_parent: 0,
    comment_mail_notify: 'comment_mail_notify',
    author: '阿强',
    email: '382798577@163.com',
    url: ''
})

let options = {
    hostName: 'http://91mjw.com',
    port: 80,
    path: '/wp-content/themes/91mjw/modules/comment.php',
    method:'post',
    headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'Connection': 'keep-alive',
        'Content-Length': postData.length,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'UM_distinctid=165f1e59957f10-0e40d90ab3ace2-1033685c-13c680-165f1e59958a2a; CNZZDATA1261174353=330783581-1537356693-https%253A%252F%252Fwww.google.com.hk%252F%7C1540577913',
        'DNT': 1,
        'Host': '91mjw.com',
        'Origin': 'http://91mjw.com',
        'Referer': 'http://91mjw.com/video/150.htm?Play=6',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    }
}

let req = http.request(options,function(res){
    console.log(JSON.stringify(res));

    res.on('data',function(chunk){
        console.log(Buffer.isBuffer(chunk)); //是否属于二进制流文件;
        console.log(chunk)
    })
    res.on('end',function(){
        console.log('评论完毕');
    })
})

req.on('error',function(e){
    console.error(JSON.stringify(e))
})

req.write(postData); //当数据变动的时候刷新
req.end(); //手动结束