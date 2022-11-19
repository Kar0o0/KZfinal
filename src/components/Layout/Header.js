import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate()
  return (
    <header className={classes.header}>
      <div className="home">
        <h1 onClick={()=>navigate("/")}><i className="fa fa-home" aria-hidden="true"></i> <span className={classes["header-txt"]}>Home</span></h1>
      </div>
      <div>
        <HeaderCartButton onClick={()=>navigate('/cart')} />
      </div>
      <div>
      <h1 onClick={()=>navigate("/")}><i className="fa fa-sign-in" aria-hidden="true"></i> <span className={classes["header-txt"]}>Login</span></h1>
      </div>
    </header>
  );
};

export default Header;
