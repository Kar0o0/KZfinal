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
        <img src={props.product.image} />
      </div>
      <div className={classes.details}>
        <div className={classes.title}>
        <p onClick={() => navigate(`/product/${props.product._id}`)} className={classes.name}>
          {props.product.name}
        </p>
        </div>
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
