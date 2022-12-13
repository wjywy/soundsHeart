import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Input, Button, Card } from 'antd'
import './index.less'

const App = () => {
    let [password, setPassword] = useState(null);
    let [code, setCode] = useState(null);
    let [examcode, setExamcode] = useState(false);
    let [exampass, setExampass] = useState(false);
    let [examExam, setExamExam] = useState(false);

    let navigate = useNavigate()

    function handleCode(e) {
        console.log(e.target.value.length)
        console.log(e.target.value)
        if ((e.target.value.length < 6 || e.target.value.length > 12) && e.target.value !== '') {
            console.log('长度出错')
            setExamcode(false)
        } else {
            setCode(e.target.value)
            setExamcode(true)
        }
    }
    function inputPassword(e) {
        if ((e.target.value.length < 6 || e.target.value.length > 12) && e.target.value !== null) {
            console.log('长度出错')
            setExampass(false)
        } else {
            setPassword(e.target.value)
            setExampass(true)
        }

    }
    function examPassword(e) {
        if (e.target.value != password) {
            console.log("两次输入密码不一致");
            setExamExam(false)
        } else {
            console.log(e.target.value)
            setExamExam(true)
        }
    }
    function checkTrue() {
        if (exampass && examcode && examExam) {
            navigate('/home', { replace: false })
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
    }, [])
    return (
        <>
            <div className='login_tocenter'>
                <div className='login_text_password'>
                    <Input type="text" placeholder='请输入手机号或者邮箱' bordered={false}
                        onChange={handleCode} />
                    <div className='login_divide'></div>
                    <Input type="password" placeholder='请输入密码' bordered={false}
                        onChange={inputPassword} />
                    <div className='login_divide'></div>
                    <Input type="password" placeholder='请重复密码' bordered={false}
                        onChange={examPassword} />
                    <div className='login_divide'></div>
                </div>
                <div className='login_forget_find'>
                    <div className='login_forgrtPassword'>忘记密码</div>
                    <div className='login_findPassword'>找回密码</div>
                </div>
                <Button onClick={checkTrue} type={'primary'} style={{ marginTop: 20, width: '55%', borderRadius: 5 }}>点击登录</Button>
            </div>
        </>
    )
}
export default App