import api from "./api";

export const getMonthlyTrend = async (
  filename,
  filters = {}
) => {
  const response = await api.get(`/monthly-trend/${filename}`, {
    params: filters,
  });

  return response.data;
};