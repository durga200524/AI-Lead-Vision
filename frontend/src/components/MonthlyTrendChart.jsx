import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MonthlyTrendChart({
  data,
  onMonthClick,
  selectedMonth,
}) {
  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const sortedData = [...data].sort(
    (a, b) =>
      monthOrder.indexOf(a.Month) -
      monthOrder.indexOf(b.Month)
  );

  return (
    <div
      style={{
        background: "#FFFFFF",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "#1E293B",
        }}
      >
        Monthly Booking Trend
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={sortedData}
          onClick={(state) => {
            console.log("Chart Click:", state);

            if (
              state &&
              state.activeLabel &&
              onMonthClick
            ) {
              console.log(
                "Selected Month:",
                state.activeLabel
              );

              onMonthClick(state.activeLabel);
            }
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="Month" />

          <YAxis />

          <Tooltip
            formatter={(value) => [
              Number(value).toLocaleString(),
              "Booking Value",
            ]}
          />

          <Line
            type="monotone"
            dataKey="Booking_Value_INR"
            stroke="#2563EB"
            strokeWidth={3}
            dot={(props) => {
              const {
                cx,
                cy,
                payload,
              } = props;

              const isSelected =
                payload.Month === selectedMonth;

              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 8 : 6}
                  fill={
                    isSelected
                      ? "#EF4444"
                      : "#2563EB"
                  }
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  style={{
                    cursor: "pointer",
                  }}
                />
              );
            }}
            activeDot={{
              r: 9,
              cursor: "pointer",
            }}
          />
        </LineChart>
      </ResponsiveContainer>

      {selectedMonth && (
        <div
          style={{
            marginTop: "15px",
            textAlign: "center",
            fontWeight: "600",
            color: "#2563EB",
            fontSize: "16px",
          }}
        >
          Selected Month: <b>{selectedMonth}</b>
        </div>
      )}
    </div>
  );
}

export default MonthlyTrendChart;