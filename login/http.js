let db = require('mongoose');
let express = require('express');
let cors = require('cors');//解决跨域问题
let app = new express();
app.use(cors());
let link = db.createConnection('mongodb://localhost:27017/login');
link.on('open',function(err) {
    if(!err) {
        console.log('数据库连接成功')
    }else {
        console.log(err);
    }
})
let modelSchema = new db.Schema({
    user:{
        type:String,
    },
    password:{
        type:Number,
    },
    phonenumber:{
        type:Number
    },
    picture:{
        type:String
    }
},{collection:'loginMessage'});
let model = link.model('loginMessage',modelSchema);

app.get('/register',function(req,res) {
    let userMessage = req.query.user;
    let passwordMessage = req.query.password;
    let phonenumberMessage = req.query.phonenumber;
    // 把消息添加至数据库
    model.create({
        user:userMessage,
        password:passwordMessage,
        phonenumber:phonenumberMessage
    },function(err,doc) {
        if(!err) {
            res.send(doc);
        }
    })
});
app.get('/enter',function(req,res) {
    let userMessage = req.query.user;
    let passwordMessage = req.query.password;
    let imgMessage = req.query.img;
     model.findOne({
        user:userMessage,
        password:passwordMessage,
        img:imgMessage
    },function(err,doc){
        if(doc) {
            res.send(doc);
        }else {
            res.send(err);
        }
    })
      
});

app.get('/find',function(req,res) {
    let userMessage = req.query.user;
    model.findOne({
        user:userMessage
    },function(err,doc){
        if(doc) {
            res.send(doc);
        }else {
            res.send(err);
        }
    })
})

app.get('/connection',function(req,res) {
    res.send('<h1>hello</h1vg>');
})

app.listen(3000);
// 解决跨域
app.all('*', function(req, res, next) {
    console.log(req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header('Access-Control-Max-Age',1728000);
    next();
});



