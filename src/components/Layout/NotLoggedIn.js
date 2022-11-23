import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./NotLoggedIn.module.css";
import StyledSpinner from "./Spinner";

const NotLoggedIn = (props) => {
  const { loadingUser } = useSelector((state) => state.user);
  const navigate = useNavigate()
  return (
    <>
      {loadingUser && <StyledSpinner variant="primary" animation="border" />}
      {!loadingUser && (
        <div className={classes.complex}>
          <div className={classes.container}>
            <h1 className={classes.title}>Oops</h1>
            <p className={classes.message}>
              It seems like you have not logged in
            </p>
            <div className={classes.buttons}>
              <button onClick={() => navigate("/login")}>Login</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotLoggedIn;
