import { Bell, Search, UserCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function handleLogout() {
  if (!window.confirm("Are you sure you want to logout?")) return;

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");
}

  return (
    <div
      style={{
        height: "85px",
        background: "#FFFFFF",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        borderBottom: "1px solid #E2E8F0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      {/* Left Side */}

      <div
        style={{
          minWidth: "350px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "30px",
            fontWeight: "700",
            color: "#0F172A",
          }}
        >
          AI Lead Vision
        </h2>

        <p
          style={{
            margin: "6px 0 0 0",
            fontSize: "14px",
            color: "#64748B",
            fontWeight: "500",
          }}
        >
          MIS Analytics Copilot
        </p>
      </div>

      {/* Right Side */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        {/* Search */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#F8FAFC",
            border: "1px solid #E2E8F0",
            padding: "10px 16px",
            borderRadius: "12px",
            width: "260px",
          }}
        >
          <Search size={18} color="#64748B" />

          <input
            type="text"
            placeholder="Search reports..."
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              marginLeft: "10px",
              width: "100%",
              fontSize: "14px",
            }}
          />
        </div>

        {/* Live Status */}

        <div
          style={{
            background: "#ECFDF5",
            color: "#16A34A",
            padding: "10px 16px",
            borderRadius: "12px",
            fontWeight: "600",
            fontSize: "13px",
          }}
        >
          🟢 Live
        </div>

        {/* Date */}

        <div
          style={{
            color: "#475569",
            fontWeight: "600",
            fontSize: "14px",
          }}
        >
          {today}
        </div>

        {/* Notification */}

        <Bell
          size={22}
          color="#475569"
          style={{
            cursor: "pointer",
          }}
        />

        {/* Profile */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <UserCircle size={40} color="#2563EB" />

          <div>
            <div
  style={{
    fontWeight: "700",
    color: "#0F172A",
  }}
>
  {user?.full_name || "Admin"}
</div>

<div
  style={{
    fontSize: "12px",
    color: "#64748B",
  }}
>
  {user?.role || "MIS Analyst"}
</div>
          </div>
        </div>
        <button
  onClick={handleLogout}
  style={{
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#DC2626",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  <LogOut size={18} />
  Logout
</button>

      </div>
    </div>
  );
}

export default Navbar;