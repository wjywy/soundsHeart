import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenHome from "../../components/menu/index";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { Button } from "antd";
import "./index.less";

const App = () => {
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/sound")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const to_sound = () => {
    navigate("/home/sound", { replace: false });
  };
  return (
    <>
      <MenHome />
      <Button value={"心音图鉴"} onClick={to_sound}>
        心音图鉴
      </Button>
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default App;
