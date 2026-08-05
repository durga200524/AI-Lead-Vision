import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function ProjectSummaryChart({ data, onProjectClick }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Project Booking Value</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="Project" />

          <YAxis />

          <Tooltip
            formatter={(value) => [
              "₹ " + Number(value).toLocaleString(),
              "Booking Value",
            ]}
          />

          <Bar
  dataKey="Total_Booking_Value"
  fill="#3B82F6"
  radius={[6, 6, 0, 0]}
  cursor="pointer"
  onClick={(data) => onProjectClick(data.Project)}
/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProjectSummaryChart;