import axios from "axios";

// Render Backend URL
const API = "https://ai-lead-vision-1.onrender.com";

export async function login(username, password) {
  try {
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
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
}