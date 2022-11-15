import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <div>
        <p>Home</p>
      </div>
      <div>
        <HeaderCartButton onClick={props.onShowCart} />
      </div>
      <div>
        <p>email</p>
      </div>
    </header>
  );
};

export default Header;
