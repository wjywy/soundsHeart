let userMessage = JSON.parse(localStorage.getItem('userMessage'));
let userId = userMessage.user;
let userPicture = userMessage.img;
// let base = userMessage.img



document.getElementById('dimensionWord1').innerHTML = userId;
let headPicture = document.getElementById('headPicture')
// let binaryData = [];
// binaryData.push(userPicture);
// headPicture.src = base
// alert(headPicture.src)
headPicture.src = userPicture;






// alert(headPicture.src);

// 点击头像换对象
let headpotrait = document.querySelector('.left').querySelectorAll('img');
let srcUrl;
for (let i = 0; i < headpotrait.length; i++) {
    headpotrait[i].addEventListener('click', function () {
        srcUrl = headpotrait[i].src;
    })
}

// 聊天消息的发送
function sendMessage() {
    // let g = new Date();//创建日期
    let div = document.createElement("div")//创建div大盒子

    div.className = 'Dimension';
    div.style.height = '45px';
    div.style.alignItems = 'center';
    div.style.marginTop = '15px'
    document.getElementById("receiveMessage").prepend(div);//将div大盒子插入
    let image = document.createElement('img');//创建一个标签
    image.src = srcUrl;
    image.className = 'twoDimension';
    div.appendChild(image);//插入新建的大盒子中去
    let messageBox = document.createElement('div')//专门装消息的盒子
    messageBox.className = 'rightDimension';
    messageBox.id = 'messageBox';
    div.appendChild(messageBox);
    var value = document.getElementById("input").innerHTML;//获取input标签的value
    messageBox.innerHTML = value + "<br>";//添加内容
    document.getElementById("input").innerHTML = '';//清空输入框
}

// 图片点击显示到发送区
let list = document.getElementsByClassName('picture');
for (let i = 0; i < list.length - 1; i++) {     //因为第一张图片无此功能
    list[i].addEventListener('click', function () {
        let send = document.getElementById('input');
        send.innerHTML += "<img src='" + list[i].src + "' + class='picture'>";
    })
}
let count = 2;
list[list.length - 1].addEventListener('click', function () {
    let pictureBox = document.getElementById('pictureBox')
    if (count % 2 == 0) {
        pictureBox.style.display = 'block';
    } else {
        pictureBox.style.display = 'none';
    }
    count++;
})
