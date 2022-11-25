import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import classes from "./Profile.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const userInfo = user.user;
  return (
    <section className={classes.profile}>
      <div className={classes.img}>
        <img src={userInfo.image} />
      </div>
      <div className={classes.info}>
        <p>
          <Badge>Username: </Badge> {userInfo.username}
        </p>
        <p>
          <Badge>Email: </Badge> {userInfo.email}
        </p>
        <p>
          <Badge>First Name: </Badge> {userInfo.firstname}
        </p>
        <p>
          <Badge>Last Name: </Badge> {userInfo.lastname}
        </p>
        <p>
          <Badge>Age: </Badge> {userInfo.age}
        </p>
        <p>
          <Badge>City: </Badge> {userInfo.city}
        </p>
        <p>
          <Badge>Gender: </Badge> {userInfo.gender}
        </p>
        <p>
          <Badge>Mobile: </Badge> {userInfo.mobile}
        </p>
      </div>
    </section>
  );
};

export default Profile;
