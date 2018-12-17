var request = require('request');
var cheerio = require('cheerio');

const allpageIndex = 50;

function init(time) {

    let urls = [];
    for (let i = 0; i <= allpageIndex; i++) {
        if (i) {
            urls.push(`http://www.qingting.fm/channels/112576/${i}`)
        }
    }

    let index = 0;
    if (urls.length) {
        let intval = setInterval(function () {
            if (index >= allpageIndex) {
                clearInterval(intval);
                return false
            }
            
            index++;
            console.log(`----------------   当前爬取第${index}页    ------------------`)
            let url = urls[index-1];
            if (url) {
                requestFn(url);
            }
        }, time)
    }
}

function requestFn(url) {
    let Referer = '';
    let pageIndex = url.split('112576/').length > 1 ? url.split('112576/')[1] : 0;
    if (!pageIndex || pageIndex < 2) {
        Referer = 'www.baidu.com'
    } else {
        Referer = 'http://www.qingting.fm/channels/112576/' + (pageIndex - 1)
    }
    console.log(`url================>${url}`)
    console.log(`Referer=============>`+Referer)
    // Referer = ?
    request({
        url,   // 请求的URL
        method: 'GET',                   // 请求方法
        headers: {                       // 指定请求头
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'cookie': 'Hm_lvt_bbe853b61e20780bcb59a7ea2d051559=1542700726,1543541840,1544599013,1545011712; Hm_lpvt_bbe853b61e20780bcb59a7ea2d051559=' + parseInt(new Date().getTime() / 1000),
            'DNT': 1,
            'Host': 'www.qingting.fm',
            'Referer': Referer,
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.80 Safari/537.36'
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body);
            var $ = cheerio.load(body);
            let couesData = [];
            try {
                let chapters = $("._1EVW");
                console.log('title=============>' + $('.og2m.line-clamp.line-clamp-2').attr('title'));
                chapters.each(function (index, item) {
                    let chapter = $(item);
                    let title = chapter
                        .find("p._10IE")
                        .text()
                        .trim();
                    let href = chapter.find("._-_jo").attr("href");
                    let obj = {
                        href: href,
                        title: title
                    };
                    couesData.push(obj);
                });
                console.log(couesData)
            } catch (e) {
                console.log(e.message)
            }

            // $('li._1EVW').forEach(item=>{
            //     let text_ = item.find('p._10IE').text();
            //     list.push(text_)
            // })
            // console.log(list) // 输出网页内容
        }
    });
}

init(10000);