import { Badge } from "react-bootstrap";
import classes from "./CheckOutCartItem.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const CheckOutCartItem = (props) => {
    const navigate = useNavigate()
  return (
    <div className={classes["cart-item"]} onClick={()=>navigate(`/product/${props.product._id}`)}>
      <div className={classes.image}>
        <img src="https://dkstatics-public.digikala.com/digikala-products/fb5ac01262f2b1988fa8eeb29f966e81583b3969_1605620114.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80" />
      </div>
      <div className={classes.title}>
        <p>{props.product.name} <Badge>( <i className="fa fa-times" aria-hidden="true"></i>{props.product.qty} )</Badge></p>
      </div>
    </div>
  );
};

export default CheckOutCartItem;
