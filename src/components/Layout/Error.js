import classes from "./Error.module.css";

const Error = (props) => {
  return (
    <div className={classes.complex}>
      <div className={classes.container}>
        <h1 className={classes.title}>ERROR ACCURRED</h1>
        <p className={classes.message}>{props.message}</p>
      </div>
    </div>
  );
};

export default Error;
