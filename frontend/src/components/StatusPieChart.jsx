import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#EF4444",
  "#F59E0B",
];

function StatusPieChart({ data, onStatusClick }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Status Distribution</h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
  data={data}
  dataKey="Total_Units"
  nameKey="Status"
  outerRadius={120}
  label
  onClick={(data) => onStatusClick(data.Status)}
  cursor="pointer"
>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatusPieChart;