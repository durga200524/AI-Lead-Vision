import { useState } from "react";

function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");

  function handleSend() {
    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        padding: "20px",
        background: "#FFFFFF",
        borderTop: "1px solid #E5E7EB",
      }}
    >
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about bookings, projects, revenue..."
        rows={2}
        style={{
          flex: 1,
          resize: "none",
          borderRadius: "10px",
          border: "1px solid #CBD5E1",
          padding: "12px",
          fontSize: "15px",
          outline: "none",
        }}
      />

      <button
        onClick={handleSend}
        style={{
          width: "130px",
          background: "#2563EB",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "15px",
        }}
      >
        Ask AI
      </button>
    </div>
  );
}

export default ChatInput;