import api from "./api";

export const getFilters = async (filename) => {
  const response = await api.get(`/filters/${filename}`);
  return response.data;
};