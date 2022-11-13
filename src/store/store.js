import {
  combineReducers,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import { productReducer, productsReducer } from "./reducer";

const reducers = combineReducers({
  productsList: productsReducer,
  currentProduct: productReducer
});
const middleware = [thunk];
const initialState = {
  productsList: { products: [], loadingProducts: false, errorProducts: "" },
  currentProduct: {product:{}, loadingProduct:false,errorProduct:""}
};
const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
