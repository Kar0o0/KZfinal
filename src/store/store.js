import {
  combineReducers,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./reducer";

const reducers = combineReducers({
  productsList: productsReducer,
});
const middleware = [thunk];
const initialState = {
  productsList: { products: [], loadingProducts: false, errorProducts: "" },
};
const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
