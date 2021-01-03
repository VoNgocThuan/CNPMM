import Axios from "axios";

export const checkIfStaffAuthenticated = () => {
  const getLoginStaffData = localStorage.getItem("loginStaffData");
  console.log("getLoginStaffData",getLoginStaffData);
  if (getLoginStaffData != null) {
    const staffData = JSON.parse(getLoginStaffData);
    if (staffData.success && staffData.access_token !== null) {
      return staffData.staff;
    }
    return false;
  }
  return false;
};

export const registerStaff = async (data) => {
    return await Axios.post('http://127.0.0.1:8000/api/auth/register-staff', data)
    .then((res) => {
      return res.data;
    });
}

export const loginStaff = async (data) => {
  return await Axios.post('http://127.0.0.1:8000/api/auth/login-staff', data)
  .then((res) => {
    return res.data;
  });
}