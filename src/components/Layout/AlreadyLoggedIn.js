import classes from "./AlreadyLoggedIn.module.css";

const AlreadyLoggedIn = (props) => {
  return (
    <div className={classes.complex}>
      <div className={classes.container}>
        <h1 className={classes.title}>Oops</h1>
        <p className={classes.message}>It seems like you have already logged in</p>
      </div>
    </div>
  );
};

export default AlreadyLoggedIn;