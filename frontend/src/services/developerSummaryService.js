import api from "./api";

export const getDeveloperSummary = async (
  filename,
 filters = {}
) => {
  const response = await api.get(`/developer-summary/${filename}`, {
    params: filters,
  });

  return response.data;
};