import { useState } from "react";
import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Post from "./pages/Post.tsx";
import Item from "./pages/Item.tsx";
import Store from "./pages/Store.tsx";
import DefaulltHeader from "./PageComponents/DefaulltHeader.tsx";
import MyPage from "./pages/MyPage.tsx";
import AdminDashboard from "./Admin/AdminDashboard.tsx";
import ViewAdminPostData from "./Admin/pages/ViewAdminPostData.tsx";
import AuthSuccess from "@/pages/AuthSuccess.js";
import AuthFailed from "@/pages/AuthFailed.js";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <DefaulltHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addpost" element={<Post />} />
        <Route path="/store/:id" element={<Item />} />
        <Route path="/store" element={<Store />} />
        <Route path="/my/*" element={<MyPage />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/admin/post/:id" element={<ViewAdminPostData />} />

        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/auth-failed" element={<AuthFailed />} />
      </Routes>
    </>
  );
}

export default App;
