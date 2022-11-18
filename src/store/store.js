import {
  combineReducers,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import { cartReducer, productReducer, productsReducer } from "./reducer";

const reducers = combineReducers({
  productsList: productsReducer,
  currentProduct: productReducer,
  cart: cartReducer,
});
const middleware = [thunk];
const initialState = {
  productsList: { products: [], loadingProducts: false, errorProducts: "" },
  currentProduct: { product: {}, loadingProduct: false, errorProduct: "" },
  cart: {
    cartList: localStorage.getItem("cart") !==null?JSON.parse(localStorage.getItem("cart")):[],
    cartLoading: false,
    cartError: "",
    cartIds: JSON.parse(localStorage.getItem("cartIds")),
    itemsCount: JSON.parse(localStorage.getItem("itemsCount")),
  },
};
const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
