import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import './index.less'

const App = () => {
    let [password, setPassword] = useState( );
    let [code, setCode] = useState( );
    let [exam,setExam] = useState( );
    let arr = []
    function handleCode(e) {
        console.log(e.target.value.length)       
        console.log(e.target.value)
        if ( (e.target.value.length < 6 || e.target.value.length > 12) && e.target.value !== '') {
            console.log('111')
            console.log('长度出错')
            return false
        }
        setCode(() => {
            code = e.target.value
            return true
        })
    }
    function inputPassword(e) {
        if((e.target.value.length < 6 || e.target.value.length > 12) && e.target.value !== null) {
            console.log("22222");
            console.log('长度出错')
            return false
        }
        setPassword(() => {
            password = e.target.value
            return true
        }) 
    }
    function examPassword(e) {
        setExam(() => {
            exam = e.target.value
        })
        if (exam != password) {
            console.log("两次输入密码不一致");
            return false
        } else {
            return true
        }
    }
    function checkTrue () {
        if(handleCode == true && inputPassword == true && examPassword == true) {
            alert('准备进入首页，开始准备路由')
        } else {
            alert('您还有错误未修改')
        }
    }
    useEffect(() => {
        axios.get('http://localhost:3000/login')
            .then((res) => {
                console.log(res.data)
                console.log(res.data.message)
            })
            .catch((error) => {
                console.log(error);
            })
    },[])
    return (
        <>
            <div className='login_tocenter'>
                <div className='login_text_password'>
                    <label htmlFor="code">账号</label>
                    <input type="text" id='code' placeholder='请输入手机号或者邮箱'
                       onBlur={handleCode} />
                    <label htmlFor="password" >密码</label>
                    <input type="password" id='password' placeholder='请输入密码'
                        onBlur={inputPassword} />
                    <label htmlFor="exam" >检验</label>
                    <input type="password" id='exam' placeholder='请验证密码'
                        onBlur={examPassword} />
                </div>
                <div className='login_forget_find'>
                    <div className='login_forgrtPassword'>忘记密码</div>
                    <div className='login_findPassword'>找回密码</div>
                </div>
                <button className='login_button' onClick={checkTrue}>点击登录</button>
            </div>
        </>
    )
}
export default App