import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Layout/Header";
import {Routes, Route} from 'react-router-dom'
import Home from "./components/Home/home";
import ProductDetail from "./components/Products/ProductDetail";
import Cart from "./components/Cart/Cart";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import { getProfile } from "./store/action";
import AlreadyLoggedIn from "./components/Layout/AlreadyLoggedIn";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProfile(JSON.parse(localStorage.getItem("token"))))
  }, [])

  const {user,isLoggedIn} = useSelector((state)=>state.user)
  


  
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/login" element={isLoggedIn ? <AlreadyLoggedIn/> : <Login />}/>
        <Route path="/signup" element={isLoggedIn ? <AlreadyLoggedIn/> :<Signup />}/>
        <Route path="/product/:productId" element={<ProductDetail />}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
