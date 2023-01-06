const express = require('express')
const mysql = require('mysql')
const bodyparser = require('body-parser')  //解析body请求体的数据
const router = express.Router()

const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"630wujiayuwy",
    database:"sound"
})

let urllencodeParser = bodyparser.urlencoded({extended:true})  //解析表单数据，当参数为true时可以解析任意类型的数据
// 点击注册，需要到数据库新增数据
router.post('/',urllencodeParser,function(req,res,next) {
    let registerCode = req.body.code   
    let registerPassword = req.body.password
    console.log(registerCode);
    console.log(registerPassword);
    let sql = 'insert into user value(?,?)'
    let sqlparams = [registerCode,registerPassword]
    conn.query(sql,sqlparams,(err,result) => {
        if (err) {
            res.send(err)
        }
        console.log(result)
    })
    conn.end()
})

module.exports = router