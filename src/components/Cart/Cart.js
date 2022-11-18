import { useSelector } from "react-redux"
import classes from './Cart.module.css'
import Card from "../UI/Card";


const Cart = ()=>{
    const {cartList} = useSelector((state)=>state.cart)
    console.log(cartList)
    return <div className={classes.cartList}>
        {cartList.map((item)=><div><p>{item.name}</p><p>{item.price}</p><p>{item.qty}</p></div>)}
    </div>
}

export default Cart