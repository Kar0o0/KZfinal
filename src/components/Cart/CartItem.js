import { useNavigate } from "react-router-dom";
import ChangeCountButton from "../Products/ChangeCountButton";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const navigate = useNavigate();
  return (
    <div className={classes.item}>
      <div className={classes.image}>
        <img src="https://dkstatics-public.digikala.com/digikala-products/fb5ac01262f2b1988fa8eeb29f966e81583b3969_1605620114.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80" />
      </div>
      <div className={classes.name}>
        <h4 onClick={()=>navigate(`/product/${props.product._id}`)}>{props.product.name}</h4>
      </div>
      <div className={classes.price}>
        <h5>
          Item price: <i className="fa fa-usd" aria-hidden="true"></i>{" "}
          {props.product.price}
        </h5>
        <h5>
          Total: <i className="fa fa-usd" aria-hidden="true"></i>{" "}
          {props.product.price * props.product.qty}
        </h5>
      </div>
      <ChangeCountButton product={props.product} />
    </div>
  );
};

export default CartItem;
