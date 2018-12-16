let http = require('http');
const url = 'http://www.imooc.com/learn/348';
let cheerio = require('cheerio');

function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}

function fiterChapters(html){
    let $ = cheerio.load(html);
    let chapters = $('.chapter');

    let couesData = [];

    chapters.each(function(item){
        let chapter = $(this);
        let chapterTitle = chapter.find('h3').text();
        let videos = chapter.find('.video').children('li');
        let chapterData = {
            chapterTitle:chapterTitle,
            videos:[]
        }
        videos.each(function(item){
            let video = $(this).find('.J-media-item');
            let videoTitle = myTrim(video.text());
            let id = video.attr('href').split('video/')[1];
            chapterData.videos.push({
                title:videoTitle,
                id:id
            })
        })

        couesData.push(chapterData);
    })

    return couesData;
}

function printCourseInfo(courseData){
    courseData.forEach(item => {
        let chapterTitle = item.chapterTitle;

        console.log(chapterTitle + '\n');
        
        item.videos.forEach((video)=>{
            console.log('【' + video.id + '】' + video.title + '\n');
        })
    });
}

http.get(url,function(res){
    let html = '';

    res.on('data',function(data){
        html += data;
    });
    res.on('end',function(){
        let couesData = fiterChapters(html);
        printCourseInfo(couesData);
    }).on('error',function(){
        console.log('请求失败！');
    })
})