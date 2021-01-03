import Axios from "axios";

export const updateOrderStatus = async (id, data) => {
  data.id = parseInt(data.id);

  return await Axios.put(`http://127.0.0.1:8000/api/order/edit/${id}`, data)
  .then((res) => {
    return res.data;
  });
}
