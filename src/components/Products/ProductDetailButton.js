import CartIcon from "../Layout/CartIcon";
import classes from "./ProductDetailButton.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, changeCount } from "../../store/action";
import ChangeCountButton from "./ChangeCountButton";

const ProductDetailButton = (props) => {
  const { cartList, cartIds } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(
    cartIds && cartIds.includes(props.product._id) ? true : false
  );

  const addToCartHandler = () => {
    setFlag(true);
    dispatch(addToCart(props.product));
  };
  return (
    <>
      {flag ? (
        <ChangeCountButton product={props.product} setFlag={setFlag}/>
      ) : (
        <button className={classes.btn} onClick={addToCartHandler}>
          {" "}
          Add to cart{" "}
          <span className={classes.icon}>
            <CartIcon />
          </span>
        </button>
      )}
    </>
  );
};

export default ProductDetailButton;
