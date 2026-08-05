import api from "./api";

export async function askAI(filename, question) {
  const response = await api.get(`/ai/${filename}`, {
    params: {
      question,
    },
  });

  return response.data;
}