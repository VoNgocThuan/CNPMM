import Axios from "axios";

export const getCategoryList = async () => {
  return await Axios.get('http://127.0.0.1:8000/api/categories').then(
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

export const deleteCategory = async (id) => {
  return await Axios.delete(`http://127.0.0.1:8000/api/categories/${id}`)
  .then((res) => {
    return res.data;
  });
}