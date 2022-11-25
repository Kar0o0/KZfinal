import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOrder } from "../../store/action";
import Error from "../Layout/Error";
import StyledSpinner from "../Layout/Spinner";
import OrdersItem from "./OrdersItem";
import classes from "./OrdersDetail.module.css";
import { Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const OrdersDetail = () => {
  const navigate = useNavigate();
  const { order, loadingOrder, errorOrder } = useSelector(
    (state) => state.currentOrder
  );
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder(params.orderId));
  }, []);
  const items = order.orderItems;
  return (
    <section>
      {items !== undefined && (
        <>
          <h1>
            <Badge bg="success">Cart Items:</Badge>
          </h1>
          {loadingOrder && (
            <StyledSpinner variant="primary" animation="border" />
          )}
          {items.length !== 0 && loadingOrder === false && (
            <div className={classes.items}>
              {items !== undefined &&
                items.map((item) => (
                  <OrdersItem product={item.product} qty={item.qty} />
                ))}
            </div>
          )}
          {errorOrder && <Error message={errorOrder} />}
          <div className={classes.buttons}>
            <button onClick={() => navigate("/orders")}>
              <i className="fa fa-arrow-left" aria-hidden="true"></i>Back
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default OrdersDetail;
