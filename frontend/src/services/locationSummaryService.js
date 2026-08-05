import api from "./api";

export const getLocationSummary = async (
  filename,
  filters = {}
) => {
  const response = await api.get(`/location-summary/${filename}`, {
    params: filters,
  });

  return response.data;
};