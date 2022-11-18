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
    let cartItem = {
      _id: product._id,
      image: product.image,
      name: product.name,
      qty: 1,
      price: product.price,
    };
    ls.push(cartItem);
    ids.push(product._id);
    count = count + 1;
    localStorage.setItem("cart", JSON.stringify(ls));
    localStorage.setItem("cartIds", JSON.stringify(ids));
    localStorage.setItem("itemsCount", JSON.stringify(count));
    dispatch({ type: "CHANGE_CART", payload: ls, ids: ids, count: count });
  } catch (error) {
    dispatch({ type: "FAILD_CART", payload: error.message });
  }
};

export const changeCount = (index, opp) => (dispatch) => {
  try {
    const ls = JSON.parse(localStorage.getItem("cart"));
    let count = JSON.parse(localStorage.getItem("itemsCount"));
    const ids = JSON.parse(localStorage.getItem("cartIds"));
    ls[index].qty = ls[index].qty + opp;
    count = count + opp;
    localStorage.setItem("cart", JSON.stringify(ls));
    localStorage.setItem("itemsCount", JSON.stringify(count));
    dispatch({ type: "CHANGE_CART", payload: ls, ids: ids, count: count });
  } catch (error) {
    dispatch({ type: "FAILD_CART", payload: error.message });
  }
};

export const deleteFromCart = (index) => (dispatch) => {
  try {
    let ls = JSON.parse(localStorage.getItem("cart"));
    let count = JSON.parse(localStorage.getItem("itemsCount"));
    let ids = JSON.parse(localStorage.getItem("cartIds"));
    let qty = ls.length ? ls[index].qty:0
    console.log(ls)
    console.log(ids)
    console.log(count)
    console.log()
    
    ls.splice(index,1)
    ids.splice(index,1)
    count = count - qty

    console.log(ls)
    console.log(ids)
    console.log(count)

    localStorage.setItem("cart", JSON.stringify(ls));
    localStorage.setItem("cartIds", JSON.stringify(ids));
    localStorage.setItem("itemsCount", JSON.stringify(count));

    dispatch({ type: "CHANGE_CART", payload: ls, ids: ids, count: count });
  } catch (error) {
    console.log(error.message)
    dispatch({ type: "FAILD_CART", payload: error.message });
  }
};
