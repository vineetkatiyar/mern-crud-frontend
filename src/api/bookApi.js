import axios from "../../axios";

export const getAllBooks = () => {
  const response = axios.get(`/`);
  return response;
};

export const getBookById = async (id) => {
  try {
    const response = await axios.get(`/${id}`);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBook = async (id) => await axios.delete(`/${id}`);

export const postBook = (data) => axios.post(`/`, data);

export const updateBook = async ({ id, ...data }) => {
  const response = await axios.put(`/${id}`, data);
  console.log("response", response);
  return response.data;
};
