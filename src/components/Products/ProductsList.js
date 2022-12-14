import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/action";
import StyledSpinner from "../Layout/Spinner";
import ProductCard from "./ProductCard";
import classes from "./ProductsList.module.css";
import { useNavigate } from "react-router-dom";
import Error from "../Layout/Error";

const ProductList = () => {
  const { products, loadingProducts, errorProducts } = useSelector(
    (state) => state.productsList
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      {loadingProducts && (
        <StyledSpinner variant="primary" animation="border" />
      )}
      <div className={classes.list}>
        {products.length !== 0 &&
          products.map((item) => (
            <ProductCard
              key={item._id}
              name={item.name}
              available={item.countInStock !== 0 ? true : false}
              price={item.price}
              rating={item.rating}
              image={item.image}
              onClick={() => navigate(`/product/${item._id}`)}
            />
          ))}
      </div>
      {errorProducts && <Error message={errorProducts}/>}
    </div>
  );
};

export default ProductList;
