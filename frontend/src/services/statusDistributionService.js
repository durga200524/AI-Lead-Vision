import api from "./api";

export const getStatusDistribution = async (
  filename,
  filters = {}
) => {
  const response = await api.get(`/status-distribution/${filename}`, {
    params: filters,
  });

  return response.data;
};