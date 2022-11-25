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
import CheckOut from "./components/Orders/CheckOut";
import ChangeProfile from "./components/Setting/ChangeProfile";
import ChangePassword from "./components/Setting/ChangePassword";
import UploadAvatar from "./components/Setting/UploadAvatar";
import Profile from "./components/User/Profile";
import OrdersList from "./components/Orders/OrdersList";
import OrdersDetail from "./components/Orders/OrdersDetail";
import Error404 from "./components/Layout/Error404";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    try{
      dispatch(getProfile(JSON.parse(localStorage.getItem("token"))))
    }catch(error){
      localStorage.removeItem("token")
    }
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
        <Route path="/setting/changeProfile" element={isLoggedIn?<ChangeProfile />:<Login />}/>
        <Route path="/setting/changePassword" element={isLoggedIn?<ChangePassword />:<Login />}/>
        <Route path="/setting/uploadAvatar" element={isLoggedIn?<UploadAvatar />:<Login />}/>
        <Route path="/profile" element={isLoggedIn?<Profile />:<Login />}/>
        <Route path="/orders" element={isLoggedIn?<OrdersList />:<Login />}/>
        <Route path="/orders/:orderId" element={isLoggedIn?<OrdersDetail />:<Login />}/>
        <Route path="*" element={<Error404 />}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
