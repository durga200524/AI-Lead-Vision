import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function DeveloperSummaryChart({ data, onDeveloperClick }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Developer Booking Value</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="Developer"
            angle={-20}
            textAnchor="end"
            interval={0}
            height={80}
          />

          <YAxis />

          <Tooltip
            formatter={(value) => [
              "₹ " + Number(value).toLocaleString(),
              "Booking Value",
            ]}
          />

          <Bar
  dataKey="Booking_Value"
  fill="#3B82F6"
  radius={[6, 6, 0, 0]}
  cursor="pointer"
  onClick={(data) => onDeveloperClick(data.Developer)}
/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DeveloperSummaryChart;