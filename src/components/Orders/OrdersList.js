import { useEffect } from "react";
import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../store/action";
import Error from "../Layout/Error";
import StyledSpinner from "../Layout/Spinner";
import classes from "./OrdersList.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const OrdersList = () => {
  const { orders, loadingOrders, errorOrders } = useSelector(
    (state) => state.ordersList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const navigate = useNavigate()
  return (
    <section className={classes.ordersListSection}>
      {loadingOrders && <StyledSpinner variant="primary" animation="border" />}
      {orders.length !== 0 &&
        orders.map((item) => (
          <div className={classes.ordersList} key={item._id}>
            <p className={classes.head}>Code: <Badge bg="success">{item._id}</Badge></p>
            <div className={classes.ordersItemList}>
              <p><Badge>Unique Items:</Badge> {item.orderItems.length}</p>
              <p>
              <Badge>Total Price:</Badge>: <i className="fa fa-usd" aria-hidden="true"></i>
                {item.totalPrice}
              </p>
              <p><Badge>Shipping Address:</Badge> {item.shippingAddress.address}</p>
              <p><Badge>Shipping Price:</Badge> <i className="fa fa-usd" aria-hidden="true"></i>{item.shippingPrice}</p>
              <p><Badge>Payment Method:</Badge> {item.paymentMethod}</p>
            </div>
            <div className={classes.btns}>
            <button className={classes.btn} onClick={()=>navigate(`/orders/${item._id}`)}>View Items</button>
            </div>
          </div>
        ))}
      {errorOrders && <Error message={errorOrders} />}
    </section>
  );
};

export default OrdersList;
