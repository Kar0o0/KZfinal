export const productsReducer = (
  state = { products: [], loadingProducts: false, errorProducts: "" },
  action
) => {
  switch (action.type) {
    case "GOT_PRODUCTS":
      return {
        products: action.payload,
        loadingProducts: false,
        errorProducts: "",
      };
    case "FAILED_PRODUCTS":
      return {
        ...state,
        errorProducts: action.payload,
        loadingProducts: false,
      };
    case "LOAD_PRODUCTS":
      return { ...state, loadingProducts: true, errorProducts: "" };
    default:
      return state;
  }
};

export const productReducer = (
  state = { product: {}, loadingProduct: false, errorProduct: "" },
  action
) => {
  switch (action.type) {
    case "GOT_PRODUCT":
      return {
        product: action.payload,
        loadingProduct: false,
        errorProduct: "",
      };
    case "FAILED_PRODUCT":
      return { ...state, errorProduct: action.payload, loadingProduct: false };
    case "LOAD_PRODUCT":
      return { ...state, loadingProduct: true, errorProduct: "" };
    default:
      return state;
  }
};

export const cartReducer = (
  state = {
    cartList: localStorage.getItem("cart") !==null?JSON.parse(localStorage.getItem("cart")):[],
    cartLoading: false,
    cartError: "",
    cartIds: localStorage.getItem("cartIds") !==null?JSON.parse(localStorage.getItem("cartIds")):[],
    itemsCount: localStorage.getItem("itemsCount") !== null ?JSON.parse(localStorage.getItem("itemsCount")):0,
    totalPrice: localStorage.getItem("totalPrice") !==null? JSON.parse(localStorage.getItem("totalPrice")):0,
  },
  action
) => {
  switch (action.type) {
    case "CHANGE_CART":
      return {
        cartList: action.payload,
        cartLoading: false,
        cartError: "",
        cartIds: action.ids,
        itemsCount: action.count,
        totalPrice: action.totalPrice,
      };
    case "LOADING_CART":
      return { ...state, cartLoading: true, cartError: "" };
    case "FAILD_CART":
      return { ...state, cartError: action.payload, cartLoading: false };
    default:
      return state;
  }
};
