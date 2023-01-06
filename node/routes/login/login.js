// 实现登录 注册  忘记密码 找回密码的接口功能
//   登录 ：/login

let express = require('express');
const mysql = require('mysql')
const db = require('../../dao/db');
let router = express.Router();
let conn

// let conn = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"630wujiayuwy",
//     database:"sound"
// })

// 点击登录，需要到数据库中进行查找
router.get('/',function (req,res,next) {
    conn = db.createConnection()
    conn.connect()
    let usename = req.query.username
    let password = req.query.password
    let sql = 'select * from user value (?,?)' //查询语句
    let sqlparams = [usename,password]
    conn.query(sql,sqlparams,(err,result) => {
        if (err) {
            res.json({
                data:[usename,password],
                code:500,
                msg:'sql执行错误',
                err
            })
        } else {
            res.json({
                data:[usename,password],
                code:200,
                msg:'查询成功',
                data:result 
            })
        }
    })
    conn.end()
})

module.exports = router