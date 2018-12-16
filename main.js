'use strict';

// 引入hellow 模块
let greet = require('./hellow');

let s = 'Michael';

greet(s); // Hello, Michael!


let fs = require('fs');

fs.readFile('sample.txt','utf-8',function (err,data) {
	// body...
	if(err){
		console.log(err)
	}else if(data){
		console.log(data)
	}
})


