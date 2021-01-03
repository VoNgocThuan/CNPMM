import Axios from "axios";

export const checkCartItem = () => {
  const getCartData = localStorage.getItem("CartData");
  console.log("getCartData",getCartData);
  if (getCartData != null) {
    const data = JSON.parse(getCartData);
    if (data.success) {
      return data.cart;
    }
    return false;
  }
  return false;
};