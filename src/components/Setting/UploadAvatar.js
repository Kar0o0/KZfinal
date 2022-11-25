import SideBar from "./SideBar";
import classes from "./ChangeProfile.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import StyledSpinner from "../Layout/Spinner";

const UploadAvatar = () => {
  const [formData, setFormData] = useState(null);
  const [formDataError, setFormDataError] = useState(null);

  const formDataErrorHandler = () => {
    if (formData === null) {
      setFormDataError(true);
    } else {
      setFormDataError(false);
    }
  };

  const [loading, setLoading] = useState(false);

  const changeAvatarHandler = async () => {
      setLoading(true);
    const formDataComplex = new FormData();
    formDataComplex.append("profile-image",formData)
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/profile-image",
        formDataComplex,
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
        text: "Your Avatar updated!",
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
        <StyledSpinner variant="primary" animation="border" />
      ) : (
        <section className={classes.setting}>
          <SideBar active={{ profile: false, password: false, avatar: true }} />
          <div className={classes.profile}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className={classes["input-complex"]}>
                <label htmlFor="file">Select File:</label>
                <div className={classes.inputs}>
                  <input
                    id="file"
                    type="file"
                    onChange={(e) => setFormData(e.target.files[0])}
                    onBlur={formDataErrorHandler}
                  />
                </div>
                {formDataError && (
                  <Badge bg="danger">Please set a valid value</Badge>
                )}
              </div>
            </form>
            <div className={classes.buttons}>
              <button onClick={changeAvatarHandler}>
                Done <i className="fa fa-check" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UploadAvatar;
