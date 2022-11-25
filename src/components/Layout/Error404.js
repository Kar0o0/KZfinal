import classes from "./Error404.module.css";

const Error404 = (props) => {
  return (
    <div className={classes.complex}>
      <div className={classes.container}>
        <h1 className={classes.title}>ERROR 404</h1>
        <p className={classes.message}>Page not Found !</p>
      </div>
    </div>
  );
};

export default Error404;
