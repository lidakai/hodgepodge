const express = require('express')
const { conn }  = require('./server')

const app = express()
app.listen(8088, ()=>{
    // 打印一下
    console.log('http://127.0.0.1:8088')
})  

module.exports = {
    app,
    conn,
}