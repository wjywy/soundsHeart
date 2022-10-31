var express = require('express');
var router = express.Router();
let fs = require('fs')
function readMyFile (fileName) {
    fs.readFile(fileName,function(err,data) {
        if(err) {
            console.log('文件读取出错')
        } else {
            console.log(data.toString())
            return 2
        }
    })
}

/* GET show listing. */
router.get('/', function(req, res, next) {
    // fs.readFile('D:/心音软件ddd/UserData/Data/心音.txt',function(err,data) {
    //     if(err) {
    //         console.log('读取文件出错')
    //     } else {
    //         let fileData = data
    //         return fileData
    //     }
    // })
res.send(readMyFile('D:/心音软件ddd/UserData/Data/心音.txt'));
// res.send('显示心音信号')
});

module.exports = router;