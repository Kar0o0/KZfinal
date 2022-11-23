import React, { useEffect } from "react";
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
import Address from "./components/Orders/Address";
import NotLoggedIn from "./components/Layout/NotLoggedIn";
import CheckOut from "./components/Orders/CheckOut";
import EmptyCart from "./components/Layout/EmptyCart";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProfile(JSON.parse(localStorage.getItem("token"))))
  }, [])
  const {isLoggedIn} = useSelector((state)=>state.user)
  const {cartList} = useSelector((state)=> state.cart)
    
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/login" element={isLoggedIn ? <AlreadyLoggedIn/> : <Login />}/>
        <Route path="/signup" element={isLoggedIn ? <AlreadyLoggedIn/> :<Signup />}/>
        <Route path="/address" element={isLoggedIn ? (cartList.length ? <Address/>:<Cart/>) :<Login />}/>
        <Route path="/checkout" element={isLoggedIn ? (cartList.length ? <CheckOut/>:<Cart/>) :<Login />}/>
        <Route path="/product/:productId" element={<ProductDetail />}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
