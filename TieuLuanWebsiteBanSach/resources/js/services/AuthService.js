import Axios from "axios";

export const checkIfAuthenticated = () => {
  const getLoginData = localStorage.getItem("loginData");
  console.log("getLoginData",getLoginData);
  if (getLoginData != null) {
    const data = JSON.parse(getLoginData);
    if (data.success && data.access_token !== null) {
      return data.user;
    }
    return false;
  }
  return false;
};

export const registerUser = async (data) => {
    return await Axios.post('http://127.0.0.1:8000/api/auth/register', data)
    .then((res) => {
      return res.data;
    });
}

export const loginUser = async (data) => {
  return await Axios.post('http://127.0.0.1:8000/api/auth/login', data)
  .then((res) => {
    return res.data;
  });
}