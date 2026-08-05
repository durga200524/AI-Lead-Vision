import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await login(username, password);

      localStorage.setItem(
        "token",
        data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/");
    } catch (err) {
      alert("Invalid username or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#EEF2FF",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: 380,
          background: "white",
          padding: 40,
          borderRadius: 16,
          boxShadow: "0 5px 20px rgba(0,0,0,.15)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          MIS Analytics Copilot
        </h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 15,
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 20,
          }}
        />

        <button
          style={{
            width: "100%",
            padding: 12,
            background: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          {loading ? "Signing In..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;