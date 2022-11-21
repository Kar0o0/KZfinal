import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = (props) => {
  const navigate = useNavigate();
  const { isLoggedIn, user, loadingUser } = useSelector((state) => state.user);
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
          <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <p>Loading...</p>
          </div>
        ) : isLoggedIn ? (
          <h2 onClick={() => console.log(user)}>
            <i className="fa fa-user" aria-hidden="true"></i>{" "}
            <span className={classes["header-txt"]}>Profile</span>
          </h2>
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
