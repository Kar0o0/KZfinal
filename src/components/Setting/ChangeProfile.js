import SideBar from "./SideBar";
import classes from "./ChangeProfile.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import StyledSpinner from "../Layout/Spinner";

const ChangeProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");

  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    gender: null,
    age: null,
    city: null,
  });

  const firstNameErrorHandler = () => {
    if (firstName.trim().length === 0) {
      setErrors({ ...errors, firstName: true });
    } else {
      setErrors({ ...errors, firstName: false });
    }
  };
  const lastNameErrorHandler = () => {
    if (lastName.trim().length === 0) {
      setErrors({ ...errors, lastName: true });
    } else {
      setErrors({ ...errors, lastName: false });
    }
  };
  const genderErrorHandler = () => {
    if (gender.trim().length === 0) {
      setErrors({ ...errors, gender: true });
    } else {
      setErrors({ ...errors, gender: false });
    }
  };
  const ageErrorHandler = () => {
    if (age.trim().length === 0) {
      setErrors({ ...errors, age: true });
    } else {
      setErrors({ ...errors, age: false });
    }
  };
  const cityErrorHandler = () => {
    if (city.trim().length === 0) {
      setErrors({ ...errors, city: true });
    } else {
      setErrors({ ...errors, city: false });
    }
  };

  const [loading, setLoading] = useState(false);

  const changeProfileHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        "http://kzico.runflare.run/user/change-profile",
        {
          firstname: `${firstName}`,
          lastname: `${lastName}`,
          gender: `${gender}`,
          age: `${age}`,
          city: `${city}`,
        },
        {
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Done",
        text: "Your profile information updated!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <StyledSpinner variant="primary" animation="border"/>
      ) : (
        <section className={classes.setting}>
          <SideBar active={{profile:true,password:false,avatar:false}} />
          <div className={classes.profile}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className={classes["input-complex"]}>
                <label htmlFor="firstName">First Name:</label>
                <div className={classes.inputs}>
                  <input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onBlur={firstNameErrorHandler}
                  />
                  {firstName.length !== 0 && (
                    <i
                      className="fa fa-close"
                      aria-hidden="true"
                      onClick={() => {
                        setFirstName("");
                        setErrors({ ...errors, firstName: true });
                      }}
                    ></i>
                  )}
                </div>
                {errors.firstName && (
                  <Badge bg="danger">Please set a valid value</Badge>
                )}
              </div>
              <div className={classes["input-complex"]}>
                <label htmlFor="lastName">Last Name:</label>
                <div className={classes.inputs}>
                  <input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onBlur={lastNameErrorHandler}
                  />
                  {lastName.length !== 0 && (
                    <i
                      className="fa fa-close"
                      aria-hidden="true"
                      onClick={() => {
                        setLastName("");
                        setErrors({ ...errors, lastName: true });
                      }}
                    ></i>
                  )}
                </div>
                {errors.lastName && (
                  <Badge bg="danger">Please set a valid value</Badge>
                )}
              </div>
              <div className={classes["input-complex"]}>
                <label htmlFor="gender">Gender:</label>
                <div className={classes.inputs}>
                  <input
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    onBlur={genderErrorHandler}
                  />
                  {gender.length !== 0 && (
                    <i
                      className="fa fa-close"
                      aria-hidden="true"
                      onClick={() => {
                        setGender("");
                        setErrors({ ...errors, gender: true });
                      }}
                    ></i>
                  )}
                </div>
                {errors.gender && (
                  <Badge bg="danger">Please set a valid value</Badge>
                )}
              </div>
              <div className={classes["input-complex"]}>
                <label htmlFor="age">Age:</label>
                <div className={classes.inputs}>
                  <input
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    onBlur={ageErrorHandler}
                  />
                  {age.length !== 0 && (
                    <i
                      className="fa fa-close"
                      aria-hidden="true"
                      onClick={() => {
                        setAge("");
                        setErrors({ ...errors, age: true });
                      }}
                    ></i>
                  )}
                </div>
                {errors.age && (
                  <Badge bg="danger">Please set a valid value</Badge>
                )}
              </div>
              <div className={classes["input-complex"]}>
                <label htmlFor="city">City:</label>
                <div className={classes.inputs}>
                  <input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onBlur={cityErrorHandler}
                  />
                  {city.length !== 0 && (
                    <i
                      className="fa fa-close"
                      aria-hidden="true"
                      onClick={() => {
                        setCity("");
                        setErrors({ ...errors, city: true });
                      }}
                    ></i>
                  )}
                </div>
                {errors.city && (
                  <Badge bg="danger">Please set a valid value</Badge>
                )}
              </div>
            </form>
              <div className={classes.buttons}>
                <button onClick={changeProfileHandler}>
                  Done <i className="fa fa-check" aria-hidden="true"></i>
                </button>
              </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ChangeProfile;
