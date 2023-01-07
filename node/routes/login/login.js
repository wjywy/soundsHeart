// 实现登录 注册  忘记密码 找回密码的接口功能
//   登录 ：/login

let express = require('express');
const mysql = require('mysql')
const db = require('../../dao/db');
let router = express.Router();
let conn

// 点击登录，需要到数据库中进行查找
router.get('/',function (req,res,next) {
    conn = db.createConnection()
    conn.connect()
    let username = req.query.username
    let password = req.query.password
    let examPassword = req.query.examPassword
    if (password !== examPassword) {
        res.json({
            msg:'两次输入密码不一致'
        })
    } else {
        let sql = 'select * from register where username=? and password=?' //查询语句
        let sqlparams = [username,password]
        conn.query(sql,sqlparams,(err,result) => {
            if (err) {
                console.log('error',err)
                res.json({
                    msg:'数据库执行错误',
                })
            } else if (result.length === 0 ){
                res.json({
                    msg:'账号尚未注册，请注册后使用',
                })
            } else {
                res.json({
                    code:200,
                    msg:'欢迎登录'
                })
            }
        })
    }
    conn.end()
})

module.exports = router