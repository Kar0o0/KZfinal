import axios from "axios";
import { useState } from "react";
import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getProfile } from "../../store/action";
import StyledSpinner from "../Layout/Spinner";
import classes from "./Login.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {loadingUser} = useSelector((state)=>state.user)

  const [formInput, setFormInput] = useState({ email: "", password: "" });
  const [formInputErrors, setFormInputErrors] = useState({
    email: null,
    password: null,
  });
  const [loading, setLoading] = useState(false);

  const emailInputChangeHandler = (event) => {
    setFormInput({ ...formInput, email: event.target.value });
  };
  const passwordInputChangeHandler = (event) => {
    setFormInput({ ...formInput, password: event.target.value });
  };
  const emailInputErrorHandler = () => {
    if (formInput.email.trim().length === 0) {
      setFormInputErrors({ ...formInputErrors, email: true });
      setFormInput({ ...formInput, email: "" });
    } else {
      setFormInputErrors({ ...formInputErrors, email: false });
    }
  };
  const passwordInputErrorHandler = () => {
    const rgx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!rgx.test(formInput.password)) {
      setFormInputErrors({ ...formInputErrors, password: true });
      setFormInput({ ...formInput, password: "" });
    } else {
      setFormInputErrors({ ...formInputErrors, password: false });
    }
  };

  const loginButtonHandler = async () => {
    if (formInputErrors.email === false && formInputErrors.password === false) {
      setLoading(true);
      try {
        const { data } = await axios.post(
          "http://kzico.runflare.run/user/login",
          {
            email: `${formInput.email}`,
            password: `${formInput.password}`,
          }
        );
        localStorage.setItem("token", JSON.stringify(data.user.token));
        dispatch(getProfile(data.user.token));
        navigate("/");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}`,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loadingUser && <StyledSpinner variant="primary" animation="border" />}
      {loading && <StyledSpinner variant="primary" animation="border" />}      
      {!loading && !loadingUser && (
        <section className={classes.signup}>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className={classes["input-complex"]}>
              <label htmlFor="email">Username / Email:</label>
              <div className={classes.inputs}>
                <input
                  id="email"
                  value={formInput.email}
                  onChange={emailInputChangeHandler}
                  onBlur={emailInputErrorHandler}
                />
                {formInput.email !== "" && (
                  <i
                    className="fa fa-times"
                    aria-hidden="true"
                    onClick={() => {
                      setFormInput({ ...formInput, email: "" });
                      setFormInputErrors({
                        ...formInputErrors,
                        email: true,
                      });
                    }}
                  ></i>
                )}
              </div>
              {formInputErrors.email && (
                <Badge bg="danger">*Username / Email is not valid</Badge>
              )}
              {formInputErrors.email === false && (
                <Badge bg="success">
                  <i className="fa fa-check" aria-hidden="true"></i>
                </Badge>
              )}
            </div>
            <div className={classes["input-complex"]}>
              <label htmlFor="password">Password:</label>
              <div className={classes.inputs}>
                <input
                  id="password"
                  type="password"
                  value={formInput.password}
                  onChange={passwordInputChangeHandler}
                  onBlur={passwordInputErrorHandler}
                />
                {formInput.password !== "" && (
                  <i
                    className="fa fa-times"
                    aria-hidden="true"
                    onClick={() => {
                      setFormInput({ ...formInput, password: "" });
                      setFormInputErrors({
                        ...formInputErrors,
                        password: true,
                      });
                    }}
                  ></i>
                )}
              </div>
              {formInputErrors.password && (
                <Badge bg="danger">
                  *8char + number, upper-case and special char
                </Badge>
              )}
              {formInputErrors.password === false && (
                <Badge bg="success">
                  <i className="fa fa-check" aria-hidden="true"></i>
                </Badge>
              )}
            </div>
            <div className={classes.buttons}>
              <button onClick={loginButtonHandler}>Login</button>
              <button onClick={() => navigate("/signup")}>SignUp</button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default Login;
