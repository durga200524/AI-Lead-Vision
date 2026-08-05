import { useNavigate } from "react-router-dom";

function ChatHeader({ clearChat }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  function logout() {
    if (!window.confirm("Are you sure you want to logout?")) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        background: "#ffffff",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <div>
        <h2 style={{ margin: 0 }}>
          🤖 MIS Analytics Copilot
        </h2>

        <div
          style={{
            fontSize: "14px",
            color: "#6B7280",
            marginTop: "4px",
          }}
        >
          Welcome, <b>{user?.full_name}</b> ({user?.role})
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={clearChat}
          style={{
            background: "#2563EB",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🗑 Clear Chat
        </button>

        <button
          onClick={logout}
          style={{
            background: "#DC2626",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;