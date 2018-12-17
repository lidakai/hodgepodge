var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

function requestFn(url) {
    let time = parseInt(new Date().getTime()/1000)
    request({
        url,   // 请求的URL
        method: 'GET',                   // 请求方法
        headers: {                       // 指定请求头
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Cookie': `ECS_ID=475a87bf26fae8bde4d4325d21c067d323677b6f; _trs_uv=jprvlw1h_1245_b3sa; _ga=GA1.2.2074483302.1545024353; _gid=GA1.2.889212601.${time}; Hm_lvt_e9fe99c2267a6f7a9215a8724ce995b4=${time}; _trs_ua_s_1=jprwqnsm_1245_h0zc; Hm_lpvt_e9fe99c2267a6f7a9215a8724ce995b4=${time}`,
            'DNT': 1,
            'Host': 'www.meisupic.com',
            'Referer': 'http://www.meisupic.com/',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.80 Safari/537.36'
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            body =  iconv.decode(body, 'gb2312');
            console.log(body);
            var $ = cheerio.load(body);

            // $('li._1EVW').forEach(item=>{
            //     let text_ = item.find('p._10IE').text();
            //     list.push(text_)
            // })
            // console.log(list) // 输出网页内容
        }
    });
}

requestFn('http://www.meisupic.com/topic.php?id=117')