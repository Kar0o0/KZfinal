export const productsReducer = (
  state = { products: [], loadingProducts: false, errorProducts: "" },
  action
) => {
  switch (action.type) {
    case "GOT_PRODUCTS":
      return { products: action.payload, loadingProducts: false, errorProducts: "" };
    case "FAILED_PRODUCTS":
      return { ...state, errorProducts: action.payload, loadingProducts: false };
    case "LOAD_PRODUCTS":
      return { ...state, loadingProducts: true, errorProducts: "" };
    default:
        return state
};
}

export const productReducer = (
  state = { product:{}, loadingProduct: false, errorProduct: "" },
  action
) => {
  switch (action.type) {
    case "GOT_PRODUCT":
      return { product: action.payload, loadingProduct: false, errorProduct: "" };
    case "FAILED_PRODUCT":
      return { ...state, errorProduct: action.payload, loadingProduct: false };
    case "LOAD_PRODUCT":
      return { ...state, loadingProduct: true, errorProduct: "" };
    default:
        return state
};
}