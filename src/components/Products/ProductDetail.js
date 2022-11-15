import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../store/action";

import classes from "./ProductDetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge } from "react-bootstrap";
import StyledSpinner from "../Layout/Spinner";

const ProductDetail = (props) => {
  const params = useParams();
  const { product, loadingProduct, errorProduct } = useSelector(
    (state) => state.currentProduct
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct(params.productId));
  }, []);

  const rateColor =
    product.rating >= 4
      ? "success"
      : product.rating >= 2
      ? "warning"
      : "danger";

  console.log(product);

  return (
    <div className={classes["complex-box"]}>
      {loadingProduct && <StyledSpinner variant="primary" animation="border" />}
      {!loadingProduct && (
        <>
          <div className={classes["intro-box"]}>
            <img src="https://dkstatics-public.digikala.com/digikala-products/fb5ac01262f2b1988fa8eeb29f966e81583b3969_1605620114.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80" />
          </div>

          <div className={classes["main-box"]}>
            <div className={classes.title}>
              <h1>{product.name}</h1>
            </div>

            <div className={classes.subtitle}>
              <div className={classes.info}>
                <p>
                  Color: {product.color}{" "}
                  <span
                    className={classes["color-circle"]}
                    style={{ backgroundColor: `${product.color}` }}
                  >
                    {" "}
                  </span>
                </p>
                <h4>
                  Category: <Badge>{product.category}</Badge>
                </h4>
                <h4>
                  Brand: <Badge>{product.brand}</Badge>
                </h4>
                <h4>
                  Rating: <Badge bg={rateColor}>{product.rating}</Badge>
                </h4>
                <h4>
                  Price: <Badge>${product.price}</Badge>
                </h4>
              </div>
              <div className={classes["discription-and-add"]}>
                <div>
                  <h4>
                    <Badge bg="secondary">About this product:</Badge>
                  </h4>
                  <p>{product.description}</p>
                </div>
                <button>Add</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
