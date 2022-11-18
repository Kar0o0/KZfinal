import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Layout/Header";
import { getProducts } from "./store/action";
import {Routes, Route} from 'react-router-dom'
import Home from "./components/Home/home";
import ProductDetail from "./components/Products/ProductDetail";
import Cart from "./components/Cart/Cart";

function App() {
  
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/product/:productId" element={<ProductDetail />}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
