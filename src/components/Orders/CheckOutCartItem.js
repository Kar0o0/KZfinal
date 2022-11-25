import { Badge } from "react-bootstrap";
import classes from "./CheckOutCartItem.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const CheckOutCartItem = (props) => {
    const navigate = useNavigate()
  return (
    <div className={classes["cart-item"]} onClick={()=>navigate(`/product/${props.product._id}`)}>
      <div className={classes.image}>
        <img src={props.product.image} />
      </div>
      <div className={classes.title}>
        <p>{props.product.name} <Badge>( <i className="fa fa-times" aria-hidden="true"></i>{props.product.qty} )</Badge></p>
      </div>
    </div>
  );
};

export default CheckOutCartItem;
