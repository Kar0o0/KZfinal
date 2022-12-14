import { useSelector } from "react-redux";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Error from "../Layout/Error";
import EmptyCart from "../Layout/EmptyCart";
import { Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const { cartList, cartError,itemsCount,totalPrice } = useSelector((state) => state.cart);
  const {isLoggedIn} = useSelector((state)=>state.user)
  const navigate = useNavigate()
  const cartNextButtonHandler =()=>{
    if(isLoggedIn){
      navigate('/address')
    }else{
      navigate('/login')
    }
  }
  return (
    <div className={classes.cart}>
      {cartList.length > 0 && (
        <div className={classes.cartList}>
          {cartList.map((item) => (
            <CartItem key={item._id} product={item} />
          ))}
          <div className={classes.detail}>
            <div>
              <span>Total amount : <Badge>{itemsCount}</Badge></span>
              <span>Total price : <Badge><i className="fa fa-usd" aria-hidden="true"></i> {totalPrice}</Badge></span>
            </div>
            <button onClick={cartNextButtonHandler}>Next <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
          </div>
        </div>
      )}
      {!cartList.length && <EmptyCart />}
      {cartError && <Error message={cartError} />}
    </div>
  );
};

export default Cart;
