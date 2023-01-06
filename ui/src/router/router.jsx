import useLazy from "../hook/uselazy";
import { Routes, Route} from "react-router-dom";
import React from "react";
const IndexLogin = useLazy(import("../page/login/index"))
const IndexRegister = useLazy(import('../page/login/register/index'))
const Home = useLazy(import("../page/home/index"))
const HomeSound = useLazy(import("../page/home/home_sound/index"))
const Notfound = useLazy(import("../page/404Not found/404")) 
const Side = useLazy(import("../components/menu/index"))
function Routers() {
  return (
      <Routes>
        <Route path="side" element={<Side />}></Route>
        <Route path="/login/*" element={<IndexLogin />} />
        <Route path="register" element={<IndexRegister />} />
        <Route path="home" element={<Home />}>
          <Route path="sound" element={<HomeSound />}></Route>
        </Route>
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
  );
}
export default Routers