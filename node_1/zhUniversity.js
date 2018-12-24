'use strict'

let mysql = require('./mysql_user') //mysql 連接
let request = require('request-promise');
let $ = require('cheerio');
let fs = require('fs');
let Ut = require("./fs_data");
let express = require('express');
let app = express();
const URI = 'https://daily.zhihu.com/';

// app.get('/', async (req, res) => {
//     let result = await request(URI)//异步请求网页
//     let data = []
//     let elements = $('a', '.main-content .wrap .box', result)//解析出网页里的a元素
//     elements.map((i, ele) => {
//         let json = {}
//         let $ele = $(ele)
//         json.url = $ele.attr('href')//获取a元素的地址链接
//         json.title = $ele.children().text()//获取标题
//         json.img = $ele.find('img').attr('src');
//         data.push(json)
//     })
//     res.send(data)//把data数据返回给前台
// })



// app.get('/detail', async (req, res) => {
//     let url = URI + req.query.path;
//     let result = await request(url)
//     let data = {}
//     let element = $('.content-inner .answer', result)//解析网页的指定元素
//     data.avatar_url = $('.meta img.avatar', element).attr('src')//获取头像url
//     data.author = $('.meta .author', element).text()//获取作者
//     data.bio = $('.meta .bio', element).text()//获取作者签名
//     data.content = $('.content', element).html()//获取文章内容
//     data.question_title = $('h2.question-title', result).text()//获取文章title
//     data.headline_title = $('h1.headline-title',result).text();//
//     data.img_source = $('.img-source',result).text();//封面图片作者
//     res.send(data)//返回data给前台
// })



// app.listen(8002, () => {//启动一个8001端口的server服务，做定时爬取知乎日报首页相关文章
//     console.log('Listening on port 8001')
// })

async function requestFn(url) {
    let result = await request(url)//异步请求网页
    let data = []
    let elements = $('a', '.main-content .wrap .box', result)//解析出网页
    elements.map((i, ele) => {
        let json = {}
        let $ele = $(ele)
        json.url = $ele.attr('href')//获取a元素的地址链接
        json.title = $ele.children().text()//获取标题
        json.img = $ele.find('img').attr('src');
        data.push(json)
    })
    const CN = await mysql.CN();
    let querySql = 'SELECT * FROM zh_data_com';
    CN.query(querySql,function(err, result){
        //查询是否重复，如果重复则过滤掉，否则set数据库
        if(err) throw err;
        console.log(result);
        CN.end();//链接结束
    });
    return false;
    let values = '';
    data.forEach(item => {
        values += `('${item.url}','${item.title}','${item.img}'),`;
    })
    values = values.substring(0, values.length - 1);
    console.log(values);
    let sql = `insert into zh_data_com (url,title,img) values ${values};`
    console.log(sql);
    CN.query(sql, data, function (err, result) {
        if (err) throw err;

        console.log('inserted zhangsan');
        console.log(result);
        console.log('\n');
        CN.end(); //链接结束
    });
}

function mkdirImg() {
    fs.mkdir('./images', function (error) {
        if (error) {
            console.log(error);
            return false;
        } else {
            console.log('创建目录成功');
            setImg();
        }
    })
}

async function  setImg(){
    let path = "./images/2.jpg";
    let url = "http://i.meizitu.net/thumbs/2018/01/117406_24c17_236.jpg";
    let opts = {
        url: url,
        headers: {
            'Referer': 'http://www.mzitu.com/',
        }
    }
    let r1 = await Ut.downImg(opts, path);
    console.log(r1);
}

(async () => {
    try {
        //1. fs.stat  检测是文件还是目录  fs.statSync()同步获取stats对象,通过返回值接收。
        fs.stat('./images', function (error, stats) {
            if (error) {
                //不是文件也不是目录就创建
                console.log(error);
                mkdirImg()
                return false;
            } else if (!stats.isDirectory()) {
                //如果不是目录的话就创建
                mkdirImg()
            }if (stats.isDirectory()){
                //如果是目录的话直接写入该图片
                setImg();
            }
            // console.log('文件：' + stats.isFile());
            // console.log('目录：' + stats.isDirectory());
        });
    }
    catch (e) {
        console.log(e);
    }
}) //()




requestFn(URI);
