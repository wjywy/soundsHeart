import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, Button, Card } from "antd";
import { useTime } from "../../../hook/useTime";
import { register } from "../../../api/login/register";
import "../index.less";

interface User {
  name: string;
}
let time: any;
const App = () => {
  type eType = {
    target: {
      value: string;
    };
  };

  let [password, setPassword] = useState<number>(); //密码
  let [code, setCode] = useState<number>(); //账号
  let [examcode, setExamcode] = useState<boolean>(false);
  let [exampass, setExampass] = useState<boolean>(false);
  let [examExam, setExamExam] = useState<boolean>(false);
  let [count, setCount] = useState<number>(60);
  let [submit, setSubmit] = useState<boolean>(false); //发起axios的依赖
  // let [number,setNumber] = useState<number>(5)

  let navigate = useNavigate();

  // 输入手机号
  function handleCode(e: eType) {
    console.log(e.target.value.length);
    console.log(typeof e.target.value);
    if (
      (e.target.value.length < 6 || e.target.value.length > 12) &&
      e.target.value !== ""
    ) {
      console.log("长度出错");
      // setExamcode(false)
    } else {
      setCode(Number(e.target.value));
      // setExamcode(true)
    }
  }

  function sendExamWord() {
    time = setInterval(() => {
      setCount((pre) => pre - 1);
    }, 1000);
    if (count > 0 && count < 61) {
      console.log(111);
    } else {
      clearInterval(time);
      setCount(60);
    }
  }

  // 验证码
  function examWord(e: eType) {
    console.log(e.target.value.length);
  }

  // 输入密码
  function inputPassword(e: eType) {
    if (
      (e.target.value.length < 6 || e.target.value.length > 12) &&
      e.target.value !== null
    ) {
      console.log("长度出错");
      // setExampass(false)
    } else {
      setPassword(Number(e.target.value));
    }
  }

  // 重复密码
  function examPassword(e: eType) {
    if (Number(e.target.value) != password) {
      console.log("两次输入密码不一致");
      setExamExam(false);
    } else {
      console.log(e.target.value);
      setExamExam(true);
    }
  }

  // 点击跳转到注册界面
  function to_register() {
    // navigate('/register')
  }

  function submit_thing() {
    setSubmit(true);
  }

  let formData = new FormData();
  formData.append("code", String(code));
  formData.append("password", String(password));
  const Register = async () => {
    if (password && code) {
      const data = await register({
        'username': code,
        'password': password,
      }).then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
    }
  };

  useEffect(() => {
    console.log(12121212212);
    if (submit) {
        Register()
    }
  }, [submit]);

  return (
    <>
      <div className="login_tocenter">
        {/* <form> */}
        <div className="login_text_password">
          <Input
            type="text"
            placeholder="请输入手机号或者邮箱"
            bordered={false}
            onChange={handleCode}
            className="login_placeholder"
          />
          <div className="login_divide"></div>
          <div className="login_sendExamWord">
            <Input
              type="password"
              placeholder="请输入验证码"
              bordered={false}
              onChange={examWord}
              className="login_placeholder"
            />
            <Button
              onClick={sendExamWord}
              disabled={count > 0 && count < 60 ? true : false}
            >
              {" "}
              {count > 0 && count < 60 ? count : "发送验证码"}{" "}
            </Button>
          </div>
          <div className="login_divide"></div>
          <Input
            type="password"
            placeholder="请输入密码"
            bordered={false}
            onChange={inputPassword}
            className="login_placeholder"
          />
          <div className="login_divide"></div>
          <Input
            type="password"
            placeholder="请重复密码"
            bordered={false}
            onChange={examPassword}
            className="login_placeholder"
          />
          <div className="login_divide"></div>
        </div>
        {/* <div className='login_forget_find'>
                        <div className='login_forgrtPassword'>忘记密码</div>
                        <div className='login_findPassword'>找回密码</div>
                    </div> */}
        <div style={{ marginTop: 10, textAlign: "center" }}>
          <Button type="primary" onClick={submit_thing}>
            点击注册
          </Button>
        </div>
        {/* <div className='login_register' onClick={to_register}>没有账号，点击注册</div> */}
        {/* </form> */}
      </div>
    </>
  );
};
export default App;
