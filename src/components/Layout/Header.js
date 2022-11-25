import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { logOutUser } from "../../store/action";

const Header = (props) => {
  const navigate = useNavigate();
  const dispatch =useDispatch()
  const { isLoggedIn, user, loadingUser } = useSelector((state) => state.user);
  const [dropDown, setDropDown] = useState(false)

  const logOutHandler = ()=>{
    dispatch(logOutUser())
    setDropDown(false)
  }


  return (
    <header className={classes.header}>
      <div className="home">
        <h1 onClick={() => navigate("/")}>
          <i className="fa fa-home" aria-hidden="true"></i>{" "}
          <span className={classes["header-txt"]}>Home</span>
        </h1>
      </div>
      <div>
        <HeaderCartButton onClick={() => navigate("/cart")} />
      </div>
      <div>
        {loadingUser ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>Loading...</p>
          </div>
        ) : isLoggedIn ? (
          <div className={classes.loginComplex}>
            <h2 onClick={() => setDropDown(!dropDown)}>
              <i className="fa fa-user" aria-hidden="true"></i>{" "}
              <span className={classes["header-txt"]}>User {dropDown ?<i className="fa fa-chevron-circle-up" aria-hidden="true"></i>:<i className="fa fa-chevron-circle-down" aria-hidden="true"></i>}</span>
            </h2>
            <div className={dropDown ? classes.dropDown : classes.dropDownHide}>
              <p onClick={()=>{
                navigate('/profile')
                setDropDown(false)
              }}>Profile <i className="fa fa-address-card" aria-hidden="true"></i></p>
              <p onClick={()=>{
                navigate('/orders')
                setDropDown(false)
              }}>Orders <i className="fa fa-cart-arrow-down" aria-hidden="true"></i></p>
              <p onClick={()=>{
                navigate('/setting/changeProfile')
                setDropDown(false)
              }}>Setting <i className="fa fa-gear" aria-hidden="true"></i></p>
              <p onClick={logOutHandler}>Log out <i className="fa fa-sign-out" aria-hidden="true"></i></p>
            </div>
          </div>
        ) : (
          <h2 onClick={() => navigate("/login")}>
            <i className="fa fa-sign-in" aria-hidden="true"></i>{" "}
            <span className={classes["header-txt"]}>Login</span>
          </h2>
        )}
      </div>
    </header>
  );
};

export default Header;
