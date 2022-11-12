import classes from "./Spinner.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap";

const StyledSpinner = (props) => {
  return (
    <div className={classes.spinner}>
      <Spinner variant={props.variant} animation={props.animation} />
    </div>
  );
};

export default StyledSpinner