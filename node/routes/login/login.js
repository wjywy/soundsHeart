// 实现登录 注册  忘记密码 找回密码的接口功能
//   登录 ：/login

var express = require('express');
const mysql = require('mysql')
var router = express.Router();

let conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"630wujiayuwy",
    database:"sound"
})

// 点击登录，需要到数据库中进行查找
router.get('/',function (req,res,next) {
    let code = req.query.code
    let password = req.query.password
    conn.connect()
    let sql = 'select * from user value (?,?)' //查询语句
    let sqlparams = [code,password]
    conn.query(sql,sqlparams,(err,result) => {
        if (err) {
            res.json({
                code:500,
                msg:'sql执行错误',
                err
            })
        } else {
            res.json({
                code:200,
                msg:'查询成功',
                data:result 
            })
        }
        conn.end()
    })
})

module.exports = router