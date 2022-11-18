import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate()
  return (
    <header className={classes.header}>
      <div>
        <h2 onClick={()=>navigate("/")}><i className="fa fa-home" aria-hidden="true"></i> Home</h2>
      </div>
      <div>
        <HeaderCartButton onClick={()=>navigate('/cart')} />
      </div>
      <div>
        <p>email</p>
      </div>
    </header>
  );
};

export default Header;
