import { Badge } from "react-bootstrap";
import Card from "../UI/Card";
import classes from "./ProductCard.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductCard = (props) => {

  const rateColor = props.rating >= 4 ? 'success' : props.rating >=2 ? 'warning' : "danger";

  return (
    <Card onClick={props.onClick}>
      <img src={props.image} />
      {props.available ? <Badge bg='success'>Available</Badge> : <Badge bg='danger'>Not available</Badge>}
      <div className={classes.title}>
        <h4>{props.name}</h4>
      </div>
      <div className={classes.footer}>
        <p>
          Price: <Badge>${props.price}</Badge>
        </p>
        <p>
          Rate: <Badge bg={rateColor}>{props.rating}</Badge>
        </p>
      </div>
    </Card>
  );
};

export default ProductCard;
