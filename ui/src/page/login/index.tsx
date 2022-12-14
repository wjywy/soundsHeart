import React, {
    useState,
    useEffect,
    useRef
} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Input, Button, Card } from 'antd'
import { useTime } from '../../hook/useTime'
import './index.less'

const App = () => {
    let [password, setPassword] = useState<null | number>(null);
    let [code, setCode] = useState<null | number>(null);
    let [examcode, setExamcode] = useState<boolean>(false);
    let [exampass, setExampass] = useState<boolean>(false);
    let [examExam, setExamExam] = useState<boolean>(false);
    let [examWo,setExamWo] = useState<boolean>(false)

    let controlTime = useRef()
    // let [count,setCount] = useState<number[]>(useTime(60))  //倒计时hook
    let [count] = useTime(60)

    let navigate = useNavigate()


    type eType = {
        target: {
            value: string
        }
    }

    // 输入手机号
    function handleCode(e: eType) {
        console.log(e.target.value.length)
        console.log(typeof (e.target.value))
        if ((e.target.value.length < 6 || e.target.value.length > 12) && e.target.value !== '') {
            console.log('长度出错')
            setExamcode(false)
        } else {
            setCode(Number(e.target.value))
            setExamcode(true)
        }
    }

    function sendExamWord() {
        setExamWo(true)
    }

    // 验证码
    function examWord(e: eType) {
        console.log(e.target.value.length)
    }

    // 输入密码
    function inputPassword(e: eType) {
        if ((e.target.value.length < 6 || e.target.value.length > 12) && e.target.value !== null) {
            console.log('长度出错')
            setExampass(false)
        } else {
            setPassword(Number(e.target.value))
            setExampass(true)
        }

    }

    // 重复密码
    function examPassword(e: eType) {
        if (Number(e.target.value) != password) {
            console.log("两次输入密码不一致");
            setExamExam(false)
        } else {
            console.log(e.target.value)
            setExamExam(true)
        }
    }

    // 前端鉴别输入是否全部符合条件
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
                        onChange={handleCode} className='login_placeholder' />
                    <div className='login_divide'></div>
                    <div className='login_sendExamWord'>
                        <Input type="password" placeholder='请输入验证码' bordered={false}
                            onChange={examWord} className='login_placeholder' />
                        <div onClick={sendExamWord} > { count } </div>
                    </div>
                    <div className='login_divide'></div>
                    <Input type="password" placeholder='请输入密码' bordered={false}
                        onChange={inputPassword} className='login_placeholder' />
                    <div className='login_divide'></div>
                    <Input type="password" placeholder='请重复密码' bordered={false}
                        onChange={examPassword} className='login_placeholder' />
                    <div className='login_divide'></div>
                </div>
                <div className='login_forget_find'>
                    <div className='login_forgrtPassword'>忘记密码</div>
                    <div className='login_findPassword'>找回密码</div>
                </div>
                <Button onClick={checkTrue} type={'primary'} style={{ marginTop: 20, width: '55%', borderRadius: 5 }}>点击登录</Button>
                <div>{count > 0 ? count : '发送验证码'}</div>
            </div>
        </>
    )
}
export default App