import { useDispatch, useSelector } from "react-redux";
import { changeCount, deleteFromCart } from "../../store/action";
import classes from "./ProductDetailButton.module.css";
import 'font-awesome/css/font-awesome.min.css';

const ChangeCountButton = (props) => {
  const { cartList, cartIds } = useSelector((state) => state.cart);
  let itemIndex = cartIds ? cartIds.indexOf(props.product._id) : 0;

  const dispatch = useDispatch();
  const upCount = () => {
    if (cartList[itemIndex].qty < props.product.countInStock) {
      dispatch(changeCount(itemIndex, 1));
    }
  };
  const downCount = () => {
    if (cartList[itemIndex].qty !== 1) {
      dispatch(changeCount(itemIndex, -1));
    }
  };

  const deleteItemFromCart = () =>{
    props.setFlag(false)
    dispatch(deleteFromCart(itemIndex))
  }
  return (
    <div className={classes["change-count-complex"]}>
      <button className={classes.delete} onClick={deleteItemFromCart}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
      <div className={classes["change-count"]}>
        <button onClick={downCount}>-1</button>
        <span>{cartList[itemIndex] ?cartList[itemIndex].qty:0}</span>
        <button onClick={upCount}>+1</button>
      </div>
    </div>
  );
};

export default ChangeCountButton;
