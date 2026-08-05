import { CountUp } from "react-countup";
function KPICard({
  title,
  value,
  color,
  icon,
  onClick,
  growth,
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#FFFFFF",
        borderRadius: "18px",
        padding: "22px",
        boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
        borderTop: `5px solid ${color}`,
        transition: "0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow =
          "0 18px 35px rgba(37,99,235,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 10px 30px rgba(15,23,42,0.08)";
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: "#64748B",
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: "26px",
          }}
        >
          {icon}
        </div>
      </div>

      {/* Value */}
      <div
  style={{
    marginTop: "18px",
    fontSize: "36px",
    fontWeight: "700",
    color: "#0F172A",
  }}
>
  {value}
</div>

      {/* Growth Badge */}
      {growth && (
        <div
          style={{
            marginTop: "8px",
            color: growth.startsWith("-") ? "#DC2626" : "#16A34A",
            fontWeight: "600",
            fontSize: "15px",
          }}
        >
          {growth.startsWith("-") ? "▼" : "▲"} {growth}
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          marginTop: "18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "12px",
          color: "#64748B",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#16A34A",
            }}
          />
          Live Data
        </div>

        <div>Updated Today</div>
      </div>
    </div>
  );
}

export default KPICard;