import Axios from "axios";

export const getBookList = async () => {
  return await Axios.get("http://127.0.0.1:8000/api/books").then(
    (res) => {
      return res.data;
    }
  );
};

export const storeNewBook = async (data) => {
    data.category_id = parseInt(data.category_id);

    return await Axios.post('http://127.0.0.1:8000/api/books', data)
    .then((res) => {
      return res.data;
    });
}

export const updateBook = async (id, data) => {
  data.category_id = parseInt(data.category_id);

  return await Axios.put(`http://127.0.0.1:8000/api/books/${id}`, data)
  .then((res) => {
    return res.data;
  });
}

export const deleteBook = async (id) => {
  return await Axios.delete(`http://127.0.0.1:8000/api/books/${id}`)
  .then((res) => {
    return res.data;
  });
}