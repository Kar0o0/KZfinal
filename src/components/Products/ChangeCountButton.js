import { useDispatch, useSelector } from "react-redux";
import { changeCount, deleteFromCart } from "../../store/action";
import classes from "./ProductDetailButton.module.css";
import 'font-awesome/css/font-awesome.min.css';
import Swal from "sweetalert2";

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
    Swal.fire({
      title: 'Are you sure?',
      text: "Remove this product from cart.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'The product has been deleted from cart.',
          'success'
          )
          dispatch(deleteFromCart(itemIndex))
      }
    })
  }
  return (
    <div className={classes["change-count-complex"]}>
      <button className={classes.delete} onClick={deleteItemFromCart}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
      <div className={classes["change-count"]}>
        <button onClick={downCount}><i className="fa fa-minus" aria-hidden="true"></i></button>
        <span>{cartList[itemIndex] ?cartList[itemIndex].qty:0}</span>
        <button onClick={upCount}><i className="fa fa-plus" aria-hidden="true"></i></button>
      </div>
    </div>
  );
};

export default ChangeCountButton;
