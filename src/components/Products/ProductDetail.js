import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../store/action";

import classes from "./ProductDetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge } from "react-bootstrap";
import StyledSpinner from "../Layout/Spinner";
import ProductDetailButton from "./ProductDetailButton";
import Error from "../Layout/Error";

const ProductDetail = (props) => {
  const { cartIds } = useSelector((state) => state.cart);
  const params = useParams();
  const { product, loadingProduct, errorProduct } = useSelector(
    (state) => state.currentProduct
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct(params.productId));
  }, []);

  const rateColor = product.rating >= 4 ? "success" : product.rating >= 2 ? "warning" : "danger";


  return (
    <div className={classes["complex-box"]}>
      {loadingProduct && <StyledSpinner variant="primary" animation="border" />}
      {!loadingProduct && !errorProduct && (
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
                  Rating: <Badge bg={rateColor}><i className="fa fa-star" aria-hidden="true"></i> {product.rating}</Badge>
                </h4>
                <h4>
                  Price: <Badge><i className="fa fa-usd" aria-hidden="true"></i> {product.price}</Badge>
                </h4>
              </div>
              <div className={classes["discription-and-add"]}>
                <div className={classes.description}>
                  <h4>
                    <Badge bg="secondary">About this product:</Badge>
                  </h4>
                  <p>{product.description}</p>
                </div>
                {product.countInStock === 0 ? (
                  <Badge
                    bg="danger"
                    style={{
                      width: "50%",
                      alignSelf: "center",
                      padding: ".5rem",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    Product is not available
                  </Badge>
                ) : (
                  <ProductDetailButton product={product} />
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {errorProduct && <Error message={errorProduct} />}
    </div>
  );
};

export default ProductDetail;
