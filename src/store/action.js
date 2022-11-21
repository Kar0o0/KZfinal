import axios from "axios";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_PRODUCTS" });
    const { data } = await axios.get("http://kzico.runflare.run/product/");
    dispatch({ type: "GOT_PRODUCTS", payload: [...data] });
  } catch (error) {
    dispatch({ type: "FAILED_PRODUCTS", payload: error.message });
  }
};

export const getProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_PRODUCT" });
    const { data } = await axios.get(
      `http://kzico.runflare.run/product/${productId}`
    );
    dispatch({ type: "GOT_PRODUCT", payload: data });
  } catch (error) {
    dispatch({ type: "FAILED_PRODUCT", payload: error.message });
  }
};

export const addToCart = (product) => (dispatch) => {
  try {
    const ls =
      localStorage.getItem("cart") === null
        ? []
        : JSON.parse(localStorage.getItem("cart"));
    let count =
      localStorage.getItem("itemsCount") === null
        ? 0
        : JSON.parse(localStorage.getItem("itemsCount"));
    const ids =
      localStorage.getItem("cartIds") === null
        ? []
        : JSON.parse(localStorage.getItem("cartIds"));
    let total =
      localStorage.getItem("totalPrice") === null
        ? 0
        : JSON.parse(localStorage.getItem("totalPrice"));
    let cartItem = product;
    cartItem.qty = 1;
    ls.push(cartItem);
    ids.push(product._id);
    count = count + 1;
    total = total + product.price
    localStorage.setItem("cart", JSON.stringify(ls));
    localStorage.setItem("cartIds", JSON.stringify(ids));
    localStorage.setItem("itemsCount", JSON.stringify(count));
    localStorage.setItem("totalPrice", JSON.stringify(total));
    dispatch({ type: "CHANGE_CART", payload: ls, ids: ids, count: count,totalPrice:total });
  } catch (error) {
    dispatch({ type: "FAILD_CART", payload: error.message });
  }
};

export const changeCount = (index, opp) => (dispatch) => {
  try {
    const ls = JSON.parse(localStorage.getItem("cart"));
    let count = JSON.parse(localStorage.getItem("itemsCount"));
    let total = JSON.parse(localStorage.getItem("totalPrice"));
    const ids = JSON.parse(localStorage.getItem("cartIds"));
    ls[index].qty = ls[index].qty + opp;
    count = count + opp;
    total = opp === 1 ? total + ls[index].price:total - ls[index].price;
    localStorage.setItem("cart", JSON.stringify(ls));
    localStorage.setItem("itemsCount", JSON.stringify(count));
    localStorage.setItem("totalPrice", JSON.stringify(total));
    dispatch({ type: "CHANGE_CART", payload: ls, ids: ids, count: count,totalPrice:total });
  } catch (error) {
    dispatch({ type: "FAILD_CART", payload: error.message });
  }
};

export const deleteFromCart = (index) => (dispatch) => {
  try {
    let ls = JSON.parse(localStorage.getItem("cart"));
    let count = JSON.parse(localStorage.getItem("itemsCount"));
    let ids = JSON.parse(localStorage.getItem("cartIds"));
    let total = JSON.parse(localStorage.getItem("totalPrice"));
    let qty = ls.length ? ls[index].qty : 0;
    ls.splice(index, 1);
    ids.splice(index, 1);
    count = count - qty;
    total = ls.length ? total - ls[index].price * qty :0
    localStorage.setItem("cart", JSON.stringify(ls));
    localStorage.setItem("cartIds", JSON.stringify(ids));
    localStorage.setItem("itemsCount", JSON.stringify(count));
    localStorage.setItem("totalPrice", JSON.stringify(total));
    dispatch({ type: "CHANGE_CART", payload: ls, ids: ids, count: count,totalPrice:total });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: "FAILD_CART", payload: error.message });
  }
};

export const getProfile = (token)=>async (dispatch)=>{
  if(token){
    try{
      dispatch({type:"LOGIN_LOADING"})
      const {data} = await axios.get(
        "http://kzico.runflare.run/user/profile",
        {
          headers: {
            authorization:
              `Bearer ${token}`,
          },
        }
      )
      dispatch({type:"LOGIN_SUCCESS",payload:data})

    }catch(error){
      dispatch({type:"LOGIN_FAILED",payload:error.response.data})
    }
  }
  else{
    dispatch({type:"LOGIN_FAILED",payload:"not logged in"})
  }
}