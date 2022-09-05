import axios from "axios";

//here consuming API from backend
export const getDataAPI = async (url, token) => {
  const res = await axios.get(`/api/${url}`, {
    headers :{ Authorization: token }
  });
  return res;
};


export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};