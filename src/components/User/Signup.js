import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import classes from "./Signup.module.css";
import StyledSpinner from "../Layout/Spinner";
import { Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();
  const {loadingUser} = useSelector((state)=>state.user)


  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });
  const [formInputErrors, setFormInputErrors] = useState({
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
    mobile: null,
  });
  const [loading, setLoading] = useState(false);

  const usernameInputChangeHandler = (event) => {
    setFormInput({ ...formInput, username: event.target.value });
  };
  const emailInputChangeHandler = (event) => {
    setFormInput({ ...formInput, email: event.target.value });
  };
  const passwordInputChangeHandler = (event) => {
    setFormInput({ ...formInput, password: event.target.value });
  };
  const confirmPasswordInputChangeHandler = (event) => {
    setFormInput({ ...formInput, confirmPassword: event.target.value });
  };
  const mobileInputChangeHandler = (event) => {
    setFormInput({ ...formInput, mobile: event.target.value });
  };

  const usernameInputErrorHandler = () => {
    if (formInput.username.trim().length === 0) {
      setFormInputErrors({ ...formInputErrors, username: true });
      setFormInput({ ...formInput, username: "" });
    } else {
      setFormInputErrors({ ...formInputErrors, username: false });
    }
  };
  const emailInputErrorHandler = () => {
    const rgx = /\S+@\S+\.\S+/;
    if (!rgx.test(formInput.email)) {
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
  const confirmPasswordInputErrorHandler = () => {
    const rgx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (
      formInput.password !== formInput.confirmPassword ||
      !rgx.test(formInput.confirmPassword)
    ) {
      setFormInputErrors({ ...formInputErrors, confirmPassword: true });
      setFormInput({ ...formInput, confirmPassword: "" });
    } else {
      setFormInputErrors({ ...formInputErrors, confirmPassword: false });
    }
  };
  const mobileInputErrorHandler = () => {
    // const rgx =/^(\+98|0098|98|0)?9\d{9}$/
    const rgx = /^09\d{9}$/;
    if (!rgx.test(formInput.mobile)) {
      setFormInputErrors({ ...formInputErrors, mobile: true });
      setFormInput({ ...formInput, mobile: "" });
    } else {
      setFormInputErrors({ ...formInputErrors, mobile: false });
    }
  };

  const signUpButtonHandler = async () => {
    if (
      formInputErrors.username === false &&
      formInputErrors.email === false &&
      formInputErrors.password === false &&
      formInputErrors.confirmPassword === false &&
      formInputErrors.mobile === false
    ) {
      setLoading(true);
      try {
        const { data } = await axios.post(
          "http://kzico.runflare.run/user/signup",
          {
            username: `${formInput.username}`,
            email: `${formInput.email}`,
            password: `${formInput.password}`,
            mobile: `${formInput.mobile}`,
          }
        );
        Swal.fire({
          title: "Welcome to Karootopia",
          text: `${data.message}`,
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Go to login page",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
        navigate("/login");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}`,
        });
      } finally {
        setLoading(false);
      }
    }else{
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: `Please set valid inputs`,
      });
    }
  };

  return (
    <>
      {loadingUser && <StyledSpinner variant="primary" animation="border" />}
      {loading && <StyledSpinner variant="primary" animation="border" />}
      {!loading && (
        <section className={classes.signup}>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className={classes["input-complex"]}>
              <label htmlFor="username">Username:</label>
              <div className={classes.inputs}>
                <input
                  id="username"
                  value={formInput.username}
                  onChange={usernameInputChangeHandler}
                  onBlur={usernameInputErrorHandler}
                />
                {formInput.username !== "" && (
                  <i
                    className="fa fa-times"
                    aria-hidden="true"
                    onClick={() => {
                      setFormInput({ ...formInput, username: "" });
                      setFormInputErrors({
                        ...formInputErrors,
                        username: true,
                      });
                    }}
                  ></i>
                )}
              </div>
              {formInputErrors.username && (
                <Badge bg="danger">*Username is not valid</Badge>
              )}
              {formInputErrors.username === false && (
                <Badge bg="success">
                  <i class="fa fa-check" aria-hidden="true"></i>
                </Badge>
              )}
            </div>
            <div className={classes["input-complex"]}>
              <label htmlFor="email">Email:</label>
              <div className={classes.inputs}>
                <input
                  id="email"
                  type="email"
                  value={formInput.email}
                  onChange={emailInputChangeHandler}
                  onBlur={emailInputErrorHandler}
                />
                {formInput.email !== "" && (
                  <i
                    class="fa fa-times"
                    aria-hidden="true"
                    onClick={() => {
                      setFormInput({ ...formInput, email: "" });
                      setFormInputErrors({ ...formInputErrors, email: true });
                    }}
                  ></i>
                )}
              </div>
              {formInputErrors.email && (
                <Badge bg="danger">*Email is not valid</Badge>
              )}
              {formInputErrors.email === false && (
                <Badge bg="success">
                  <i class="fa fa-check" aria-hidden="true"></i>
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
                    class="fa fa-times"
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
                  <i class="fa fa-check" aria-hidden="true"></i>
                </Badge>
              )}
            </div>
            <div className={classes["input-complex"]}>
              <label htmlFor="confrimPassword">Confirm Password:</label>
              <div className={classes.inputs}>
                <input
                  id="confrimPassword"
                  type="password"
                  value={formInput.confirmPassword}
                  onChange={confirmPasswordInputChangeHandler}
                  onBlur={confirmPasswordInputErrorHandler}
                />
                {formInput.confirmPassword !== "" && (
                  <i
                    class="fa fa-times"
                    aria-hidden="true"
                    onClick={() => {
                      setFormInput({ ...formInput, confirmPassword: "" });
                      setFormInputErrors({
                        ...formInputErrors,
                        confirmPassword: true,
                      });
                    }}
                  ></i>
                )}
              </div>
              {formInputErrors.confirmPassword && (
                <Badge bg="danger">*Passwords don't match</Badge>
              )}
              {formInputErrors.confirmPassword === false && (
                <Badge bg="success">
                  <i class="fa fa-check" aria-hidden="true"></i>
                </Badge>
              )}{" "}
            </div>
            <div className={classes["input-complex"]}>
              <label htmlFor="mobile">Mobile:</label>
              <div className={classes.inputs}>
                <input
                  id="mobile"
                  value={formInput.mobile}
                  onChange={mobileInputChangeHandler}
                  onBlur={mobileInputErrorHandler}
                />
                {formInput.mobile !== "" && (
                  <i
                    class="fa fa-times"
                    aria-hidden="true"
                    onClick={() => {
                      setFormInput({ ...formInput, mobile: "" })
                      setFormInputErrors({...formInputErrors,mobile:true})
                    }}
                  ></i>
                )}
              </div>
              {formInputErrors.mobile && (
                <Badge bg="danger">*Mobile is not valid</Badge>
              )}
              {formInputErrors.mobile === false && (
                <Badge bg="success">
                  <i class="fa fa-check" aria-hidden="true"></i>
                </Badge>
              )}
            </div>
            <div className={classes.buttons}>
              <button onClick={signUpButtonHandler}>SignUp</button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default Signup;
