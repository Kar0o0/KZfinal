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