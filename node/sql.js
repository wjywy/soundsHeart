const mysql = require("mysql")

// 连接数据库
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"630wujiayuwy",
    database:"sound"
})
// 库-表-字段
connection.connect()
// 插入
connection.query('insert into user value (?,?)',[3,'wangyi'],(err,res,fields) => {
  if(err) throw err
  console.log(res)
})
// 查询
connection.query('select * from user where id=? and useName=?',[1,'wujiayu'],(err,res,fields) => {   //查询部分数据
  if(err) throw err
  console.log(res)
})
connection.end()

module.exports = connection