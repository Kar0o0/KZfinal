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
    cartList:
      localStorage.getItem("cart") !== null
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
    cartLoading: false,
    cartError: "",
    cartIds:
      localStorage.getItem("cartIds") !== null
        ? JSON.parse(localStorage.getItem("cartIds"))
        : [],
    itemsCount:
      localStorage.getItem("itemsCount") !== null
        ? JSON.parse(localStorage.getItem("itemsCount"))
        : 0,
    totalPrice:
      localStorage.getItem("totalPrice") !== null
        ? JSON.parse(localStorage.getItem("totalPrice"))
        : 0,
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
      case "REMOVE_CART":
        return {cartList:[],cartLoading:false,cartError:"",cartIds:[],itemsCount:0,totalPrice:0}
    case "LOADING_CART":
      return { ...state, cartLoading: true, cartError: "" };
    case "FAILD_CART":
      return { ...state, cartError: action.payload, cartLoading: false };
    default:
      return state;
  }
};

export const userReducer = (
  state = { user: {}, loadingUser: false, errorUser: "", isLoggedIn: false },
  action
) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loadingUser: false,
        errorUser: "",
        isLoggedIn: true,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        errorUser: action.payload,
        loadingUser: false,
        isLoggedIn: false,
        errorUser:"",
      };
      case 'LOGOUT':
        return{user: {}, loadingUser: false, errorUser: "", isLoggedIn: false}
    case "LOGIN_LOADING":
      return { ...state, errorUser: "", loadingUser: true };
    default:
      return state;
  }
};

export const ordersReducer = (state={orders:[],loadingOrders:false,errorOrders:""},action)=>{
  switch (action.type) {
    case "GOT_ORDERS":
      return {
        orders: action.payload,
        loadingOrders: false,
        errorOrders: "",
      };
    case "FAILED_ORDERS":
      return {
        ...state,
        errorOrders: action.payload,
        loadingOrders: false,
      };
    case "LOAD_ORDERS":
      return { ...state, loadingOrders: true, errorOrders: "" };
    default:
      return state;
  }
}

export const orderReducer = (state ={order:{},loadingOrder:false,errorOrder:""},action)=>{
  switch (action.type) {
    case "GOT_ORDER":
      return {
        order: action.payload,
        loadingOrder: false,
        errorOrder: "",
      };
    case "FAILED_ORDER":
      return { ...state, errorOrder: action.payload, loadingOrder: false };
    case "LOAD_ORDER":
      return { ...state, loadingOrder: true, errorOrder: "" };
    default:
      return state;
  }
}