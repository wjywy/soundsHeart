var express = require('express');
var router = express.Router();
let fs = require('fs')

// 读取心音文件
function readMyFile (fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName,async function(err,data) {
            if (err) {
                reject(err)
            } else {
                resolve(data.toString())
            }
        })    
    })
}

router.get('/', async function(req, res, next) {
    let data = await readMyFile('D:/心音软件ddd/UserData/Data/心音.txt')
    
    console.log(data);
    res.send(data);
});

module.exports = router;