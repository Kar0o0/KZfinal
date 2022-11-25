import { useNavigate } from "react-router-dom";
import classes from "./SideBar.module.css";
const SideBar = (props) => {
  const navigate = useNavigate();

  return (
    <div className={classes.sideBar}>
      <p onClick={() => navigate("/setting/changeProfile")}>
        Change Profile{" "}
        {props.active.profile && (
          <i className="fa fa-star" aria-hidden="true"></i>
        )}
      </p>
      <p onClick={() => navigate("/setting/changePassword")}>
        Change Password{" "}
        {props.active.password && (
          <i className="fa fa-star" aria-hidden="true"></i>
        )}
      </p>
      <p onClick={() => navigate("/setting/uploadAvatar")}>
        Upload Avatar{" "}
        {props.active.avatar && (
          <i className="fa fa-star" aria-hidden="true"></i>
        )}
      </p>
    </div>
  );
};

export default SideBar;
