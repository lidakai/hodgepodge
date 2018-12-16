let http = require('http');
const url = 'http://www.qingting.fm/channels/112576';
let cheerio = require('cheerio');
var fs = require("fs");

function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}

// let couesData = {
//     programName:'',
//     list:[
//         {
//             title:'',
//             href:''
//         }
//     ]
// }

function fiterChapters(html){
    let $ = cheerio.load(html);
    let chapters = $('._1EVW');
    let couesData = {
        programName:myTrim($('._3h7q').text()),
        list:[]
    };

    chapters.each(function(item){
        let chapter = $(this);
        let title = myTrim(chapter.find('p._10IE').text());
        let href = chapter.find('._-_jo').attr('href');
        let obj = {
            href:href,
            title:title
        }
        couesData.list.push(obj);
    })

    return couesData;
}

function printCourseInfo(courseData){
    //programName
    console.log('title：'+courseData.programName + '\n');

    courseData.list.forEach(item => {
        console.log('【' + item.title + '】' +'href=' + item.href + '\n');
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
