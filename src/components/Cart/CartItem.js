import { Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ChangeCountButton from "../Products/ChangeCountButton";
import classes from "./CartItem.module.css";
import "bootstrap/dist/css/bootstrap.min.css";


const CartItem = (props) => {
  const navigate = useNavigate();
  return (
    <div className={classes.item}>
      <div className={classes.image}>
        <img src="https://dkstatics-public.digikala.com/digikala-products/fb5ac01262f2b1988fa8eeb29f966e81583b3969_1605620114.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80" />
      </div>
      <div className={classes.details}>
        <p onClick={() => navigate(`/product/${props.product._id}`)} className={classes.name}>
          {props.product.name}
        </p>
        <p>
          Item price: <Badge style={{fontSize:"1rem"}}><i className="fa fa-usd" aria-hidden="true"></i>{" "}
          {props.product.price}</Badge>
        </p>
        <p>
          Total: <Badge style={{fontSize:"1rem"}}><i className="fa fa-usd" aria-hidden="true"></i>{" "}
          {props.product.price * props.product.qty}</Badge>
        </p>
        <ChangeCountButton product={props.product} />
      </div>
    </div>
  );
};

export default CartItem;
