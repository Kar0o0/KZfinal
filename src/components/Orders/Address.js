import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Address.module.css";
import { Badge } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import StyledSpinner from "../Layout/Spinner";
import { setAddress } from "../../store/action";
import Swal from "sweetalert2";

const Address = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {loadingUser} = useSelector((state)=>state.user)

  const [formInput, setFormInput] = useState({
    city: "",
    address: "",
    postalCode: "",
    phoneNumber: "",
  });
  const [formInputErrors, setFormInputErrors] = useState({
    city: null,
    address: null,
    postalCode: null,
    phoneNumber: null,
  });

  const cityInputChangeHandler = (event) => {
    setFormInput({ ...formInput, city: event.target.value });
  };
  const addressInputChangeHandler = (event) => {
    setFormInput({ ...formInput, address: event.target.value });
  };
  const postalCodeInputChangeHandler = (event) => {
    setFormInput({ ...formInput, postalCode: event.target.value });
  };
  const phoneNumberInputChangeHandler = (event) => {
    setFormInput({ ...formInput, phoneNumber: event.target.value });
  };

  const cityInputErrorHandler = () => {
    if (formInput.city.trim().length === 0) {
      setFormInputErrors({ ...formInputErrors, city: true });
      setFormInput({ ...formInput, city: "" });
    } else {
      setFormInputErrors({ ...formInputErrors, city: false });
    }
  };

  const addressInputErrorHandler = () => {
    if (formInput.address.trim().length < 11) {
      setFormInputErrors({ ...formInputErrors, address: true });
      setFormInput({ ...formInput, address: "" });
    } else {
      setFormInputErrors({ ...formInputErrors, address: false });
    }
  };
  const postalCodeInputErrorHandler = () => {
    if (formInput.postalCode.trim().length === 0) {
      setFormInputErrors({ ...formInputErrors, postalCode: true });
      setFormInput({ ...formInput, postalCode: "" });
    } else {
      setFormInputErrors({ ...formInputErrors, postalCode: false });
    }
  };

  const phoneNumberInputErrorHandler = () => {
    // const rgx =/^(\+98|0098|98|0)?9\d{9}$/
    const rgx = /^09\d{9}$/;
    if (!rgx.test(formInput.phoneNumber)) {
      setFormInputErrors({ ...formInputErrors, phoneNumber: true });
      setFormInput({ ...formInput, phoneNumber: "" });
    } else {
      setFormInputErrors({ ...formInputErrors, phoneNumber: false });
    }
  };

  const addressDoneHandler = () => {
    if(formInputErrors.city === false,
      formInputErrors.address === false,
      formInputErrors.postalCode === false,
      formInputErrors.phoneNumber === false){
        localStorage.setItem("address",JSON.stringify(formInput))
        navigate("/checkout")
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Invalid value(s)",
          text: "Please enter valid values",
        });
      }
  };

  return (
    <>
      {loadingUser ? <StyledSpinner variant="primary" animation="border" /> :<section className={classes.address}>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className={classes["input-complex"]}>
              <label htmlFor="city">City:</label>
              <div className={classes.inputs}>
                <input
                  id="city"
                  value={formInput.city}
                  onChange={cityInputChangeHandler}
                  onBlur={cityInputErrorHandler}
                />
                {formInput.city !== "" && (
                  <i
                    className="fa fa-times"
                    aria-hidden="true"
                    onClick={() => {
                      setFormInput({ ...formInput, city: "" });
                      setFormInputErrors({
                        ...formInputErrors,
                        city: true,
                      });
                    }}
                  ></i>
                )}
              </div>
              {formInputErrors.city && (
                <Badge bg="danger">*City is not valid</Badge>
              )}
              {formInputErrors.city === false && (
                <Badge bg="success">
                  <i className="fa fa-check" aria-hidden="true"></i>
                </Badge>
              )}
            </div>

            <div className={classes["input-complex"]}>
              <label htmlFor="address">Address:</label>
              <div className={classes.inputs}>
                <input
                  id="address"
                  value={formInput.address}
                  onChange={addressInputChangeHandler}
                  onBlur={addressInputErrorHandler}
                />
                {formInput.address !== "" && (
                  <i
                    className="fa fa-times"
                    aria-hidden="true"
                    onClick={() => {
                      setFormInput({ ...formInput, address: "" });
                      setFormInputErrors({
                        ...formInputErrors,
                        address: true,
                      });
                    }}
                  ></i>
                )}
              </div>
              {formInputErrors.address && (
                <Badge bg="danger">*Address is not valid</Badge>
              )}
              {formInputErrors.address === false && (
                <Badge bg="success">
                  <i className="fa fa-check" aria-hidden="true"></i>
                </Badge>
              )}
            </div>

            <div className={classes["input-complex"]}>
              <label htmlFor="postalCode">Postal code:</label>
              <div className={classes.inputs}>
                <input
                  id="postalCode"
                  value={formInput.postalCode}
                  onChange={postalCodeInputChangeHandler}
                  onBlur={postalCodeInputErrorHandler}
                />
                {formInput.postalCode !== "" && (
                  <i
                    className="fa fa-times"
                    aria-hidden="true"
                    onClick={() => {
                      setFormInput({ ...formInput, postalCode: "" });
                      setFormInputErrors({
                        ...formInputErrors,
                        postalCode: true,
                      });
                    }}
                  ></i>
                )}
              </div>
              {formInputErrors.postalCode && (
                <Badge bg="danger">*Postal code is not valid</Badge>
              )}
              {formInputErrors.postalCode === false && (
                <Badge bg="success">
                  <i className="fa fa-check" aria-hidden="true"></i>
                </Badge>
              )}
            </div>

            <div className={classes["input-complex"]}>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <div className={classes.inputs}>
                <input
                  id="phoneNumber"
                  value={formInput.phoneNumber}
                  onChange={phoneNumberInputChangeHandler}
                  onBlur={phoneNumberInputErrorHandler}
                />
                {formInput.phoneNumber !== "" && (
                  <i
                    className="fa fa-times"
                    aria-hidden="true"
                    onClick={() => {
                      setFormInput({ ...formInput, phoneNumber: "" });
                      setFormInputErrors({
                        ...formInputErrors,
                        phoneNumber: true,
                      });
                    }}
                  ></i>
                )}
              </div>
              {formInputErrors.phoneNumber && (
                <Badge bg="danger">*Phone number is not valid</Badge>
              )}
              {formInputErrors.phoneNumber === false && (
                <Badge bg="success">
                  <i className="fa fa-check" aria-hidden="true"></i>
                </Badge>
              )}
            </div>

            <div className={classes.buttons}>
              <button onClick={() => navigate("/cart")}><i className="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
              <button onClick={addressDoneHandler}>Next <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
            </div>
          </form>
        </section>}
    </>
  );
};

export default Address;
