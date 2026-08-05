import api from "./api";

export const getDashboardData = async (
  filename,
  filters = {}
) => {
  const response = await api.get(`/dashboard/${filename}`, {
    params: filters,
  });

  return response.data;
};