import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenHome from '../../components/menu/index'
import axios from "axios";
import { Outlet } from "react-router-dom";
import './index.less'

const App = () => {
    let navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/enter')
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    const to_sound = () => {
        navigate('/home/sound', { replace: false })
    }
    return (
        <>
            {/* <div>欢迎来到心音首页</div> */}
            < MenHome />
            {/* <div > */}
                {/* <button className="home_heart_picture" onClick={to_sound}>心音图鉴</button> */}
            {/* </div > */}
            <div >
                <Outlet />
            </div>
        </>
    )
}
export default App