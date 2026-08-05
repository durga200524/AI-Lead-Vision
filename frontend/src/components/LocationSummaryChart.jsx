import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function LocationSummaryChart({ data, onLocationClick }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Location Booking Value</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="Location"
            angle={-20}
            textAnchor="end"
            interval={0}
            height={70}
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
  fill="#10B981"
  radius={[6, 6, 0, 0]}
  cursor="pointer"
  onClick={(data) => onLocationClick(data.Location)}
/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LocationSummaryChart;