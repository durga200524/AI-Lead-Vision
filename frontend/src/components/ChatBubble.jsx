import ReactMarkdown from "react-markdown";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

function ChatBubble({ sender, text, time }) {

  const isUser = sender === "user";

  const [copied, setCopied] = useState(false);

  async function copyMessage() {

    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);

  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          maxWidth: "70%",
          padding: "14px 18px",
          borderRadius: "16px",
          background: isUser ? "#2563EB" : "#FFFFFF",
          color: isUser ? "#FFFFFF" : "#111827",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          lineHeight: "1.7",
        }}
      >
        {/* Sender */}

        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    alignItems: "center",
  }}
>
  <span
    style={{
      fontSize: "12px",
      fontWeight: "600",
      opacity: 0.8,
    }}
  >
    {isUser ? "👤 You" : "🤖 AI Copilot"}
  </span>

  <span
    style={{
      fontSize: "11px",
      opacity: 0.6,
    }}
  >
    {time}
  </span>
</div>

        {/* Message */}

        <div
  style={{
    position: "relative",
  }}
>
  {isUser ? (
    <div>{text}</div>
  ) : (
    <>
      <div
        style={{
          fontSize: "15px",
        }}
      >
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>

      <button
        onClick={copyMessage}
        style={{
          marginTop: "12px",
          border: "none",
          background: "#F3F4F6",
          padding: "6px 10px",
          borderRadius: "8px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "13px",
        }}
      >
        {copied ? (
          <>
            <Check size={15} />
            Copied
          </>
        ) : (
          <>
            <Copy size={15} />
            Copy
          </>
        )}
      </button>
    </>
  )}
</div>
      </div>
    </div>
  );
}

export default ChatBubble;