import { useSelector } from "react-redux";
import classes from "./CheckOutAddress.module.css";

const CheckOutAddress = () => {
  const address = JSON.parse(localStorage.getItem('address'))

  return (
    <div className={classes.address}>
      <div className={classes["address-item"]}>
        <p>City:</p>
        <p className={classes.data}>{address.city}</p>
      </div>

      <div className={classes["address-item"]}>
        <p>Address:</p>
        <p className={classes.data}>{address.address}</p>
      </div>

      <div className={classes["address-item"]}>
        <p>Postal Code:</p>
        <p className={classes.data}>{address.postalCode}</p>
      </div>

      <div className={classes["address-item"]}>
        <p>Phone Number:</p>
        <p className={classes.data}>{address.phoneNumber}</p>
      </div>
    </div>
  );
};

export default CheckOutAddress;
