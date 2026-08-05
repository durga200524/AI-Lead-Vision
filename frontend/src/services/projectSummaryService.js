import api from "./api";

export const getProjectSummary = async (
  filename,
  filters = {}
) => {
  const response = await api.get(`/project-summary/${filename}`, {
    params: filters,
  });

  return response.data;
};