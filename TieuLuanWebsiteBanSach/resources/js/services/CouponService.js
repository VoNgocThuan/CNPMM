import Axios from "axios";

export const getCouponList = async () => {
  return await Axios.get('http://127.0.0.1:8000/api/list-coupon').then(
    (res) => {
      return res.data;
    }
  );
};

export const storeNewCategory = async (data) => {
    data.user_id= 1;
    return await Axios.post('http://127.0.0.1:8000/api/categories', data)
    .then((res) => {
      return res.data;
    });
}

export const updateCategory = async (id, data) => {
  data.user_id= 1;
  return await Axios.put(`http://127.0.0.1:8000/api/categories/${id}`, data)
  .then((res) => {
    return res.data;
  });
}

export const deleteCoupon = async (id) => {
  return await Axios.delete(`http://127.0.0.1:8000/api/delete-coupon/${id}`)
  .then((res) => {
    return res.data;
  });
}