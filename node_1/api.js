"use strict";

let request = require("request-promise");
let $ = require("cheerio");
let express = require("express");
let app = express();
const URI = "https://daily.zhihu.com/";

//设置跨域访问
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get("/", async (req, res) => {
  let result = await request(URI); //异步请求网页
  let data = [];
  let elements = $("a", ".main-content .wrap .box", result); //解析出网页里的a元素
  elements.map((i, ele) => {
    let json = {};
    let $ele = $(ele);
    json.url = $ele.attr("href"); //获取a元素的地址链接
    json.title = $ele.children().text(); //获取标题
    json.img = $ele.find("img").attr("src");
    data.push(json);
  });
  res.send(data); //把data数据返回给前台
});

app.get("/detail", async (req, res) => {
  let url = URI + req.query.path;
  console.log(url);
  let result = await request(url);
  let data = {};
  let element = $(".content-inner .answer", result); //解析网页的指定元素
  data.avatar_url = $(".meta img.avatar", element).attr("src"); //获取头像url
  data.author = $(".meta .author", element).text(); //获取作者
  data.bio = $(".meta .bio", element).text(); //获取作者签名
  data.content = $(".content", element).html(); //获取文章内容
  data.question_title = $("h2.question-title", result).text(); //获取文章title
  data.headline_title = $("h1.headline-title", result).text(); //
  data.img_source = $(".img-source", result).text(); //封面图片作者
  res.send(data); //返回data给前台
});

app.listen(8001, () => {
  //启动一个8001端口的server服务
  console.log("Listening on port 8001");
});
