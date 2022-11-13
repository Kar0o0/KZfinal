import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/action";
import StyledSpinner from "../Layout/Spinner";
import ProductCard from "./ProductCard";
import classes from "./ProductsList.module.css";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const { products, loadingProducts, errorProducts } = useSelector(
    (state) => state.productsList
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  console.log(products);

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
              image={
                "https://dkstatics-public.digikala.com/digikala-products/fb5ac01262f2b1988fa8eeb29f966e81583b3969_1605620114.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80"
              }
              onClick={() => navigate(`/product/${item._id}`)}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductList;
