import Axios from "axios";

export const checkCusIfAuthenticated = () => {
  const getLoginCustomerData = localStorage.getItem("loginCustomerData");
  console.log("getLoginCustomerData",getLoginCustomerData);
  if (getLoginCustomerData != null) {
    const customerdata = JSON.parse(getLoginCustomerData);
    if (customerdata.access_token !== null) {
      return customerdata.customer;
    }
    return false;
  }
  return false;
};

export const registerCustomer = async (data) => {
    return await Axios.post('http://127.0.0.1:8000/api/auth/register-checkout', data)
    .then((res) => {
      return res.data;
    });
}

export const loginCustomer = async (data) => {
  return await Axios.post('http://127.0.0.1:8000/api/auth/login-checkout', data)
  .then((res) => {
    return res.data;
  });
}