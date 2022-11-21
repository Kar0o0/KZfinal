import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/action";
import 'bootstrap/dist/css/bootstrap.min.css';
import StyledSpinner from "../Layout/Spinner";
import ProductList from "../Products/ProductsList";

const Home = ()=>{
    const {user,isLoggedIn} = useSelector((state)=>state.user)
     console.log(user,isLoggedIn)
    return <div><ProductList /></div>
}

export default Home