import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <p>Home</p>
      <div>
        <HeaderCartButton onClick={props.onShowCart} />
        <p>email</p>
      </div>
    </header>
  );
};

export default Header;
