
// 获取用户头像
let chooseFile = document.getElementById('avatar');

// 创建img标签
let Box = document.getElementById('symbolPicture');
let picture = document.createElement('img');
picture.id = 'picture';
Box.appendChild(picture);
picture.classList.add('picture');

chooseFile.addEventListener('change', () => {

    //一个函数  作用是将文件的隐藏路径显现出来
    function getObjectURL(file) {
        let url = null;
        if (window.createObjcectURL != undefined) {
            url = window.createOjcectURL(file);
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }
    picture.src = getObjectURL(chooseFile.files[0])
    chooseFile.classList.add('gone');
})
// 记住密码功能
document.getElementById('remember').addEventListener('click',function() {
    let userMessage = JSON.parse(localStorage.getItem('userMessage'))
    let account = userMessage.user;
    let password = userMessage.password;
    document.getElementById('enterDemo').value = account;
    document.getElementById('registerDemo').value = password;
})

// 找回密码功能
document.getElementById('forget').addEventListener('click',function() {
    let account = document.getElementById('enterDemo').value;
    $.ajax({
        url:'http://localhost:3000/find',
        type:'GET',
        dataType:'json',
        data:{
            user:account
        },
        success:function(data) {
            alert(data.password);
        },
        error:function(err) {
            console.log(err);
        }
    })
})


$("#submit1").click(function () {
    $.ajax({
        type: 'get',
        url: 'http://localhost:3000/enter',
        dataType: 'json',
        data: {
            user: document.getElementById('enterDemo').value,
            password: document.getElementById('registerDemo').value,
            img:picture.src
        },
        success: function (data) {
            console.log(data);
            if (document.getElementById('enterDemo').value == ''
                ||
                document.getElementById('registerDemo').value == '') {
                alert('请输入用户名或密码');
            } else {
                let userMessage = {
                    user:data.user,
                    img:document.getElementById('picture').src,
                };
                localStorage.setItem('userMessage',JSON.stringify(userMessage))
                location.href = ('./connection.html');
            }

        },
        error: function () {
            alert('密码或用户名出现错误')
        }
    })
})