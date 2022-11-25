import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./CheckOut.module.css";
import { useNavigate } from "react-router-dom";
import CheckOutCartItem from "./CheckOutCartItem";
import CheckOutAddress from "./CheckOutAddress";
import axios from "axios";
import Swal from "sweetalert2";
import { removeCart } from "../../store/action";
import { useState } from "react";
import StyledSpinner from "../Layout/Spinner";

const CheckOut = () => {
  const { cartList, itemsCount, totalPrice } = useSelector(
    (state) => state.cart
  );
    const [flag, setFlag] = useState(false)
  const address = JSON.parse(localStorage.getItem("address"));
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const sortCart = () =>{
    let sortedList = []
    cartList.map((item)=>{
      sortedList = [...sortedList,{product:`${item._id}`,qty:`${item.qty}`}]
    })
    return sortedList
  }

  const submitOrderHandler =async () =>{
    setFlag(true)
    const cart = sortCart()
    try{
      const {data} = await axios.post(
        "http://kzico.runflare.run/order/submit",
        {
          orderItems: [...cart],
          shippingAddress: {
            address: `${address.address}`,
            city: `${address.city}`,
            postalCode: `${address.postalCode}`,
            phone: `${address.phoneNumber}`,
          },
          paymentMethod: "cash",
          shippingPrice: "5",
          totalPrice: `${totalPrice}`,
        },
        {
          headers: {
            authorization:
              `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      )
      dispatch(removeCart())
      navigate('/')
      Swal.fire({
        icon: "success",
        title: "Order Submited",
        text: "Your order submited successfuly",
      });
    }catch (error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    }finally{
      setFlag(false)
    }
  }
  
  return (
    <>
    {flag ? <StyledSpinner variant="success" animation="border"/>:<section className={classes["check-out"]}>
    <div className={classes.cartList}>
      <h2 className={classes["check-out-headers"]}>Cart:</h2>
      <div className={classes.items}>
        {cartList.map((item) => (
          <CheckOutCartItem key={item._id} product={item} />
        ))}
      </div>
      <div className={classes.cartDetail}>
        <p>
          Total Amount: <Badge bg="dark">{itemsCount}</Badge>
        </p>
        <p>
          Total Price:{" "}
          <Badge bg="dark">
            <i className="fa fa-usd" aria-hidden="true"></i> {totalPrice}
          </Badge>
        </p>
      </div>
    </div>
    <h2 className={classes["check-out-headers"]}>Address:</h2>
    <CheckOutAddress />
    <div className={classes.btns}>
      <button className={classes.editBtn} onClick={()=>navigate('/cart')}><i className="fa fa-arrow-left" aria-hidden="true"></i> Edit</button>
      <button className={classes.doneBtn} onClick={submitOrderHandler}>Done <i className="fa fa-check" aria-hidden="true"></i></button>
    </div>
  </section>}</>
  );
};

export default CheckOut;