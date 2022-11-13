import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Layout/Header";
import { getProducts } from "./store/action";
import {Routes, Route} from 'react-router-dom'
import Home from "./components/Home/home";
import ProductDetail from "./components/Products/ProductDetail";

function App() {
  
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/product/:productId" element={<ProductDetail />}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
