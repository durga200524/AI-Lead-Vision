import api from "./api";

export const getDrilldownData = async (filename, filters = {}) => {
  try {
    const response = await api.get(
      `/drilldown/${filename}`,
      {
        params: {
          project: filters.project,
          developer: filters.developer,
          location: filters.location,
          status: filters.status,
          month: filters.month,
          search: filters.search,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching drilldown data:", error);
    throw error;
  }
};