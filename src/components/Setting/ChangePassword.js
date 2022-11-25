import SideBar from "./SideBar";
import classes from "./ChangePassword.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import StyledSpinner from "../Layout/Spinner";

const ChangePassword = () =>{
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [errors, setErrors] = useState({
        oldPassword: null,
        newPassword: null,
      });

      const oldPasswordErrorHandler = () => {
        if (oldPassword.trim().length === 0) {
          setErrors({ ...errors, oldPassword: true });
        } else {
          setErrors({ ...errors, oldPassword: false });
        }
      };
      const newPasswordErrorHandler = () => {
        if (newPassword.trim().length === 0) {
          setErrors({ ...errors, newPassword: true });
        } else {
          setErrors({ ...errors, newPassword: false });
        }
      };

      const [loading, setLoading] = useState(false);

      const changePasswordHandler = async () => {
        setLoading(true);
        try {
          const { data } = await axios.put(
            "http://kzico.runflare.run/user/change-password",
            {
              old_password: `${oldPassword}`,
              new_password: `${newPassword}`,
            },
            {
              headers: {
                authorization:
                  `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
              },
            }
          )
          Swal.fire({
            icon: "success",
            title: "Done",
            text: "Your password updated!",
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
              <SideBar active={{profile:false,password:true,avatar:false}} />
              <div className={classes.profile}>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className={classes["input-complex"]}>
                    <label htmlFor="oldPassword">Old Password:</label>
                    <div className={classes.inputs}>
                      <input
                        id="oldPassword"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        onBlur={oldPasswordErrorHandler}
                      />
                      {oldPassword.length !== 0 && (
                        <i
                          className="fa fa-close"
                          aria-hidden="true"
                          onClick={() => {
                            setOldPassword("");
                            setErrors({ ...errors, oldPassword: true });
                          }}
                        ></i>
                      )}
                    </div>
                    {errors.oldPassword && (
                      <Badge bg="danger">Please set a valid value</Badge>
                    )}
                  </div>
                  <div className={classes["input-complex"]}>
                    <label htmlFor="newPassword">New Password:</label>
                    <div className={classes.inputs}>
                      <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        onBlur={newPasswordErrorHandler}
                      />
                      {newPassword.length !== 0 && (
                        <i
                          className="fa fa-close"
                          aria-hidden="true"
                          onClick={() => {
                            setNewPassword("");
                            setErrors({ ...errors, newPassword: true });
                          }}
                        ></i>
                      )}
                    </div>
                    {errors.newPassword && (
                      <Badge bg="danger">Please set a valid value</Badge>
                    )}
                  </div>
                </form>
                  <div className={classes.buttons}>
                    <button onClick={changePasswordHandler}>
                      Done <i className="fa fa-check" aria-hidden="true"></i>
                    </button>
                  </div>
              </div>
            </section>
          )}
        </>
      );
}

export default ChangePassword