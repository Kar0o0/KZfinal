import { Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./OrdersItem.module.css";
import { useNavigate } from "react-router-dom";

const OrdersItem = (props) => {
    const navigate = useNavigate()
  return (
    <div className={classes.item}>
      <img src="https://dkstatics-public.digikala.com/digikala-products/fb5ac01262f2b1988fa8eeb29f966e81583b3969_1605620114.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80" />
      <div className={classes.title}>
        <p>
          {props.product.name}{" "}
          <Badge>
            ( <i className="fa fa-times" aria-hidden="true"></i>
            {props.qty} )
          </Badge>
        </p>
      </div>
        <p><Badge>Item Price:</Badge> <i className="fa fa-usd" aria-hidden="true"></i>{props.product.price}</p>
        <p><Badge>Color:</Badge> {props.product.color}</p>
        <p><Badge>Brand:</Badge> {props.product.brand}</p>
    </div>
  );
};

export default OrdersItem;
