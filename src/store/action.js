import axios from 'axios'

export const getProducts = ()=> async(dispatch)=>{
    try {
        dispatch({type:"LOAD_PRODUCTS"})
        const {data} =await axios.get("http://kzico.runflare.run/product/");
        dispatch({type:"GOT_PRODUCTS",payload:[...data]})
    } catch (error) {
        dispatch({type:"FAILED_PRODUCTS",payload:error.message})
    }
}

export const getProduct = (productId)=> async(dispatch)=>{
    try {
        dispatch({type:"LOAD_PRODUCT"})
        const {data} =await axios.get(`http://kzico.runflare.run/product/${productId}`);
        dispatch({type:"GOT_PRODUCT",payload:data})
    } catch (error) {
        dispatch({type:"FAILED_PRODUCT",payload:error.message})
    }
}