import {
  LayoutDashboard,
  Upload,
  BarChart3,
  FileSpreadsheet,
  Bot,
  Settings,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.webp";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/",
    },
    {
      icon: <Upload size={20} />,
      label: "Upload Excel",
      path: "/upload",
    },
    {
      icon: <BarChart3 size={20} />,
      label: "Analytics",
      path: "/",
    },
    {
      icon: <FileSpreadsheet size={20} />,
      label: "Reports",
      path: "/",
    },
    {
      icon: <Bot size={20} />,
      label: "AI Copilot",
      path: "/copilot",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/",
    },
  ];

  return (
    <div
      style={{
        width: "290px",
        height: "100vh",
        background: "#0F172A",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        padding: "25px 18px",
        boxSizing: "border-box",
        borderRight: "1px solid #1E293B",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        <img
          src={logo}
          alt="AI Lead Vision"
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "14px",
            objectFit: "cover",
            boxShadow: "0 8px 20px rgba(124,58,237,0.35)",
          }}
        />

        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "700",
              color: "#FFFFFF",
            }}
          >
            AI Lead Vision
          </h2>

          <p
            style={{
              marginTop: "4px",
              color: "#94A3B8",
              fontSize: "11px",
              lineHeight: "16px",
            }}
          >
            MIS Analytics Copilot
            <br />
            Enterprise BI Platform
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ flex: 1 }}>
        {menuItems.map((item, index) => {
          const active =
            item.path !== "#" &&
            (location.pathname === item.path ||
              (item.path === "/" &&
                location.pathname !== "/upload" &&
                location.pathname !== "/copilot"));

          return (
            <Link
              key={index}
              to={item.path}
              style={{
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  marginBottom: "10px",
                  color: active ? "#FFFFFF" : "#CBD5E1",
                  background: active
                    ? "linear-gradient(90deg,#2563EB,#1D4ED8)"
                    : "transparent",
                  transition: "0.3s",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                {item.icon}
                {item.label}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "16px",
          borderRadius: "12px",
          background: "#1E293B",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "28px" }}>🤖</div>

        <h4
          style={{
            margin: "8px 0 5px",
          }}
        >
          AI Copilot
        </h4>

        <p
          style={{
            fontSize: "12px",
            color: "#94A3B8",
            margin: 0,
          }}
        >
          Powered by AI
        </p>
      </div>
    </div>
  );
}

export default Sidebar;