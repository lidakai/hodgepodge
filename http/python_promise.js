const http = require("http");
const fs = require("fs");
// const requests = require('requests');
// var eventproxy = require("eventproxy");
// const ep = new eventproxy();
const cheerio = require("cheerio");
let host = "http://www.qingting.fm/channels/112576/";
// let crawlingList = {
//   list: []
// };
let pages = 0;
let activePage = 0;

let couesData = {
  programName: "",
  list: []
};

function getPage() {
  if (activePage <= pages) {
    activePage++;
    let url = host + activePage;
    console.log(
      `-------------loading => 爬取中  当前第${activePage}页--------------`
    );
    console.log(`url=====>${url}`);
    _createServer(url).then(res => {
      fiterChapters(res).then(() => {
        getPage();
      });
    });
  } else {
    //输出汇总的数据
    collect_fn();
  }
}

function fiterChapters(html) {
  return new Promise((resolve, reject) => {
    let $ = cheerio.load(html);
    let pagination_lis = $(".pagination").find("li");
    if (activePage <= 1) {
      pages =
        parseInt(
          pagination_lis
            .eq(pagination_lis.length - 2)
            .find("a")
            .text()
            .trim(),
          10
        ) - 1;
    }

    let chapters = $("._1EVW");
    couesData.programName = $("._3h7q")
      .text()
      .trim();
    // let chaptersList = {
    //   pageindex: activePage,
    //   list: []
    // };
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
      couesData.list.push(chaptersList);
      resolve();
    }
  });
  // return couesData;
}
function mkdir() {
  fs.mkdir("爬虫获取到的资源文件", 0777, function(err) {
    if (err) {
      return console.log(err);
    } else {
      console.log("创建成功");
    }
  });
}
function writeFile() {

  addData();

  fs.writeFile(
    "进击的段子.txt",
    JSON.stringify(couesData),
    { flag: "w" },
    function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("写入成功");
      }
    }
  );
}
function collect_fn() {
  // mkdir(); //创建文件夹
  writeFile(); //资源存起来
}

function _createServer(url) {
  return new Promise((resolve, reject) => {
    let html = "";
  let path = url.split('www.qingting.fm')[1];
    var option={
      'hostname':'http://www.qingting.fm',
      path,
      'headers':{
        "Content-Type":"application/json",
        "DNT": "1",
        "Origin": "http://www.qingting.fm",
        "Referer": "http://www.qingting.fm/vchannels/112576",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36"
      }
    };
    http.get(option, function(res) {
      res.on("data", function(data) {
        html += data;
      });
      res
        .on("end", function() {
          resolve(html);
        })
        .on("error", function(e) {
          reject(e);
        });
    });
  });
}

getPage();

function addData() {
  var mysql = require("mysql");

  let connection = mysql.createConnection({
    host: "47.99.240.192",  //ip
    user: "root", //数据库名
    password: "likai360",  //数据库密码
    database: "test" //数据库名字
  });

  var values = couesData.list;
  var sql = "INSERT INTO program(href,title) VALUES ?";
  connection.query(sql, [values], function(err, rows, fields) {
    if (err) {
      console.log("INSERT ERROR - ", err.message);
      return;
    }
    console.log("INSERT SUCCESS");
  });
  connection.end();
}
