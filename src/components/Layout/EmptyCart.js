import classes from "./EmptyCart.module.css";

const EmptyCart = () => {
  return (
    <div className={classes.complex}>
      <div className={classes.container}>
        <h1 className={classes.title}>NO ITEM FOUND</h1>
        <p className={classes.message}>Your cart is empty</p>
      </div>
    </div>
  );
};

export default EmptyCart;