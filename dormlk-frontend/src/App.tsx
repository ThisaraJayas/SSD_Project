import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import { Button } from "@/components/ui/button.tsx"
// import Header from './PageComponents/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import PostAdd from './pages/PostAdd.tsx'
import Post from './pages/Post.tsx'
import Footer from './PageComponents/Footer.tsx'
import Item from './pages/Item.tsx'
import Store from './pages/Store.tsx'
import DefaulltHeader from './PageComponents/DefaulltHeader.tsx'
import MyPage from './pages/MyPage.tsx'
import AdminDashboard from './Admin/AdminDashboard.tsx'
import ViewAdminPostData from './Admin/pages/ViewAdminPostData.tsx'





function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Header/> */}
    <DefaulltHeader/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/addpost' element={<Post/>}/>
        <Route path='/store/:id' element={<Item/>}/>
        <Route path='/store' element={<Store/>}/>
        <Route path='/my/*' element={<MyPage/>}/>
        <Route path='/admin/*' element={<AdminDashboard/>}/>
        <Route path='/admin/post/:id' element={<ViewAdminPostData/>}/>
      </Routes>
     
      {/* <Link to={''}>
        <a>Go to About Page</a>
      </Link> */}

    
    </>
  )
}

export default App
