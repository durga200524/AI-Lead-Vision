function InsightsPanel() {
  return (
    <div
      style={{
        width: "300px",
        background: "#F9FAFB",
        borderLeft: "1px solid #E5E7EB",
        padding: "20px",
        overflowY: "auto",
      }}
    >
      <h2 style={{ marginTop: 0 }}>
        📊 Dashboard Insights
      </h2>

      <div style={cardStyle}>
        <h4>Total Units</h4>
        <h2>5760</h2>
      </div>

      <div style={cardStyle}>
        <h4>Booked Units</h4>
        <h2>1481</h2>
      </div>

      <div style={cardStyle}>
        <h4>Available Units</h4>
        <h2>3817</h2>
      </div>

      <div style={cardStyle}>
        <h4>Outstanding Amount</h4>
        <h2>₹760 Cr</h2>
      </div>

      <div style={cardStyle}>
        <h4>Booking Rate</h4>
        <h2>25.7%</h2>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

export default InsightsPanel;