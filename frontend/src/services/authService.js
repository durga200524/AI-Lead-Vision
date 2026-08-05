import axios from "axios";

const API = "http://127.0.0.1:8000";

export async function login(username, password) {
  const response = await axios.post(`${API}/auth/login`, {
    username,
    password,
  });

  // Save JWT token
  localStorage.setItem("token", response.data.access_token);

  // Save logged-in user details
  localStorage.setItem(
    "user",
    JSON.stringify(response.data.user)
  );

  return response.data;
}