new Vue ({
            el: '#register',
            data: {
                code: Math.floor(Math.random() * 9000 + 1000),
                disable:false,
                number:60,
            },
            methods: {
                changeCode() {
                    this.code = Math.floor(Math.random() * 9000 + 1000)
                },
                // 检测用户名是否为空
                checkName(){
                    var name = document.getElementById("user").value;
                    var span = document.getElementById("userSpan");
                    if(name==null||name==""){
                        span.innerHTML='此用户名为空';
                        span.style.color = "red";
                        return false;
                    }
                    else{
                        span.innerHTML='用户名格式正确';
                        span.style.color="green";
                        return true;
                    }
                },
                // 检测密码格式是否正确
                checkPassword(){
                    var password = document.getElementById("password").value;
                    var span = document.getElementById("passwordSpan");
                    if(password.length<4||password.length>12){
                        span.innerHTML = '密码位数不正确';
                        span.style.color ='red';
                        return false;
                    }
                    else {
                        span.innerHTML = '密码格式正确';
                        span.style.color = 'green';
                        return true;
                    }
                },
                // 核验两次密码是否一致
                affirmPassword(){
                    var password1 = document.getElementById("password").value;
                    var password2 = document.getElementById("password2").value;
                    var span = document.getElementById("affirmPassword");
                    if(password1==password2&&password1!=''&&password2!=''){
                        span.innerHTML = '确认密码成功';
                        span.style.color = 'green';
                        return true;
                    }
                    else{
                        span.innerHTML = '两次密码不一致';
                        span.style.color = 'red';
                        return false;
                    }
                },
                // 发送验证码后的倒计时效果
                timeDelete(){
                    // setInterval中的第二个参数代表每隔多少毫秒就执行该函数；
                    // clearInterval的意思是停止执行setInterval；
                    var numberDown = setInterval(() => {
                        if(this.number < 1){
                            // this.disable = false;
                            this.number = 60;
                            this.disable=false;
                            clearInterval(numberDown);
                        }else{
                            this.disable = true;
                            document.getElementById("codeBack").innerHTML = this.number-- + 's后发送'
                        }
                    }, 1000);
                },
                // 核验验证码是否相同
                checkCode(){
                    var code1 = this.code;
                    var code2 = document.getElementById("exem").value;
                    var span = document.getElementById("checkCode");
                    if(code1==code2){
                        span.innerHTML = '验证码核验正确';
                        span.style.color = 'green';
                        return true;
                    }
                    else{
                        span.innerHTML = '验证码核验失败';
                        span.style.color = 'red';
                        return false;
                    }
                },
                // 是否勾选公司协议
                // 判断点击了几次，单数为勾选，偶数为未勾选
                affirmAgree(){
                    let count=2;
                    var span = document.getElementById("affirm");
                    if(count%2==0){
                        span.innerHTML = '您已勾选';
                        span.style.color = 'green';
                        return true;
                    }
                    else{
                        span.innerHTML = '您还未勾选协议';
                        span.style.color = 'red';
                        return false;
                    }
                },
                login() {
                    if(this.checkName()==true&&this.checkPassword()==true&&this.affirmPassword()==true
                        &&this.checkCode()==true&&this.affirmAgree()==true) {
                            $.ajax({
                                type:'get',
                                url:'http://localhost:3000/register',
                                data:{
                                    password:document.getElementById('password').value,
                                    user:document.getElementById('user').value,
                                    phonenumber:document.getElementById('phonenumber').value
                                },
                                dataType:'json',
                                success:function(data) {
                                    console.log(data);
                                    if(data.user==''||data.password==null||data.phonenumber==null) {
                                        alert('注册出错')
                                    }else {
                                        window.location.href = './enter.html'
                                    }
                                },
                                error:function(err) {
                                    console.log(err);
                                }
                            })
                        }else {
                            alert('出错啦');
                        }
                }
            },
        })
// $("#submit").click(function() {
//     $.ajax({
//         type:'get',
//         url:'http://localhost:3000/register',
//         data:{
//             password:document.getElementById('password').value,
//             user:document.getElementById('user').value,
//             phonenumber:document.getElementById('phonenumber').value
//         },
//         dataType:'json',
//         success:function(data) {
//             console.log(data);
//             if(data.user==''||data.password==null||data.phonenumber==null) {
//                 alert('注册出错')
//             }else {
//                 window.location.href = './enter.html'
//             }
//         },
//         error:function(err) {
//             console.log(err);
//         }
//     })
// })
 

   
