function SuggestedQuestions({ onQuestionClick }) {
  const questions = [
    "total units",
    "booked units",
    "available units",
    "cancelled units",
    "booking rate",
    "outstanding amount",
    "total projects",
    "total developers",
  ];

  return (
    <div
      style={{
        marginBottom: "20px",
      }}
    >
      <h3
        style={{
          marginBottom: "12px",
          color: "#374151",
        }}
      >
        💡 Suggested Questions
      </h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {questions.map((question) => (
          <button
            key={question}
            onClick={() => onQuestionClick(question)}
            style={{
              padding: "10px 16px",
              borderRadius: "20px",
              border: "1px solid #D1D5DB",
              background: "white",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SuggestedQuestions;