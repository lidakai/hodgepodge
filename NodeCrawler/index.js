var Crawler = require("crawler");
let couesData = {
    programName: "",
    list: []
  },querySize = 10;
function getData($,num){
    let chapters = $("._1EVW");
    couesData.programName = $("._3h7q")
      .text()
      .trim();
    let chaptersList = [];
    chapters.each(function() {
      let chapter = $(this);
      let title = chapter
        .find("p._10IE")
        .text()
        .trim();
      let href = chapter.find("._-_jo").attr("href");
      let obj = {
        href: href,
        title: title
      };
      chaptersList = [href,title];
      // chaptersList.push(obj);
    });
    if (chaptersList) {
      couesData.list.push(...couesData.list,...chaptersList);
    }
    // console.log(num,c.querySize,'============');
    if(num){
        if(num == querySize){
            console.log(couesData)
        }
    }
}

var c = new Crawler({
    maxConnections : 1,
    options:{
        headers:{
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
            'Cookie': 'Hm_lvt_bbe853b61e20780bcb59a7ea2d051559=1543753501,1544962892; Hm_lpvt_bbe853b61e20780bcb59a7ea2d051559=1544962892',
            'Referer': 'http://www.qingting.fm/categories/3252/0/1',
            'Host': 'www.qingting.fm',
            'Connection': 'keep-alive',
            'DNT': '1',
            'Upgrade-Insecure-Requests': '1',
            'Cache-Control': 'max-age=0',
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'Accept-Encoding': 'gzip, deflate',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
        },
    },
    rateLimit: 5000, // `maxConnections` 会强制为1个
    // 这个回调每个爬取到的页面都会触发
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $默认使用Cheerio
            // 这是为服务端设计的轻量级jQuery核心实现
            // console.log($("title").text());
            let title_ = $('title').text();
            let num = 1;
            console.log(title_)
            if(title_.split('第').length>1){
                num = title_.split('第')[1].split('页')[0];
            }
            getData($,num)
        }
        done();
    }
});

// 爬取一个URL，使用默认的callback
let urlList = [];
for(let i =1;i<=querySize;i++){
    if(i){
        let url = 'http://www.qingting.fm/channels/112576/'+i;
        urlList.push(url);
    };
}
if(urlList.length){
    c.queue(urlList);
}

// 爬取页面，自定义callback和参数
// c.queue([{
//     uri: 'http://wap.likai666.com/',
//     jQuery: false,

//     // 覆盖全局的callback
//     callback: function (error, res, done) {
//         if(error){
//             console.log(error);
//         }else{
//             console.log('Grabbed', res.body.length, 'bytes');
//         }
//         done();
//     }
// }]);

// 在队列中加入一些HTML代码，无需爬取(mostly for tests)
// c.queue([{
//     html: '<p>This is a <strong>test</strong></p>'
// }]);