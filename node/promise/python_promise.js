const http = require("http");
var eventproxy = require("eventproxy");
let ep = new eventproxy();
const cheerio = require("cheerio");
let host = "http://www.qingting.fm/channels/";
let crawlingList = [112576];
let pages = 0;

let couesData = {
  programName: "",
  list: []
};

function getPage() {
  if (pages) {
    for (let i = 2; i <= pages; i++) {
      crawlingList.forEach(item => {
        let url = host + item + "/" + i;
        ep.on('connection'+i,()=>{
         _createServer(url,i);
        })
        ep.emit('connection'+i);
      });
    }
  } else {
    crawlingList.forEach(item => {
      _createServer(host + item);
    });
  }
}

function fiterChapters(html) {
  let $ = cheerio.load(html);
  let pagination_lis = $(".pagination").find("li");
  pages = parseInt(
    pagination_lis
      .eq(pagination_lis.length - 2)
      .find("a")
      .text()
      .trim(),
    10
  );
  let chapters = $("._1EVW");
  couesData.programName = $("._3h7q")
    .text()
    .trim();

  chapters.each(function(item) {
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
    couesData.list.push(obj);
  });

  if (pages) {
    getPage();
  }

  return couesData;
}

function collect_fn(couesData_list) {
  console.log(couesData_list);
}

async function _createServer(url,i = 1) {
  let html = "";
  let path = url.split('www.qingting.fm')[1];
  var option={
    hostname:'http://www.qingting.fm',
    path,
    headers:{
      "Content-Type":"application/json",
      "DNT": "1",
      "Origin": "http://www.qingting.fm",
      "Referer": "http://www.qingting.fm/vchannels/112576",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36"
      
    }
  };
  await http.get(option, function(res) {
    res.on("data", function(data) {
      html += data;
    });
    res
      .on("end", function() {
        let couesData_list = fiterChapters(html);
        collect_fn(couesData_list);
        ep.emit('connection'+(i-1),html);
      })
      .on("error", function(e) {
        console.log(e);
      });
  });
}

getPage();
