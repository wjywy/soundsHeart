const express = require('express')
let mysql = require('mysql')
const router = express.Router()

const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"630wujiayuwy",
    database:"sound"
})
// 点击注册，需要到数据库新增数据
router.post('/',function(req,res,next) {
})

module.exports = router