import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import 'antd/dist/antd.min.css';
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>
);
