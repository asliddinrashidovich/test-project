import toast from "react-hot-toast";
import api from "./apiInstance";

export const AddData = async (url, data) => {
  try {
    const res = await api.post(url, data);
    return res.data;
  } catch (error) {
    handleError();
    throw error;
  }
};

export const getAllData = async (url, query) => {
  try {
    const params = query ?? ""

    const res = await api.get(`${url}${params}`);
    return res.data;
  } catch (error) {
    handleError();
    throw error;
  }
};

const handleError = () => {
  toast.error("something went wrong");
};
