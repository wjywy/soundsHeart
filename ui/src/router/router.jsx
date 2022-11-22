import useLazy from "../hook/uselazy";
import { Routes, Route} from "react-router-dom";
import React from "react";
const IndexLogin = useLazy(import("../page/login/index"))
const Home = useLazy(import("../page/home/index")) 
function Routers() {
  return (
      <Routes>
        <Route path="/login" element={<IndexLogin />} />
        <Route path="/home" element={<Home />}></Route>
      </Routes>
  );
}
export default Routers