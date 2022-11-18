import { useSelector } from "react-redux";
import CartIcon from "./CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const {itemsCount} = useSelector(state=>state.cart)
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      {itemsCount ? <span className={classes.badge}>{itemsCount}</span>:<span className={classes.badge}>0</span>}
    </button>
  );
};

export default HeaderCartButton;
