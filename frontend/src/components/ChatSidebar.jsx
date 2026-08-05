import { useMemo, useState } from "react";

function ChatSidebar({
  chats,
  currentChat,
  setCurrentChat,
  createChat,
  deleteChat,
  renameChat,
  pinChat,
}) {
  const [search, setSearch] = useState("");

  const filteredChats = useMemo(() => {
    return chats.filter((chat) =>
      chat.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, chats]);

  return (
    <div
      style={{
        width: "300px",
        background: "#111827",
        color: "white",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #1F2937",
      }}
    >
      {/* Header */}

      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid #374151",
        }}
      >
        <h2
          style={{
            margin: 0,
            marginBottom: "15px",
            fontSize: "20px",
          }}
        >
          🤖 AI Copilot
        </h2>

        <button
          onClick={createChat}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          ➕ New Chat
        </button>

        <input
          type="text"
          placeholder="🔍 Search chats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            marginTop: "15px",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            background: "#1F2937",
            color: "white",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Chat List */}

      <div
        style={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            style={{
              padding: "14px",
              borderBottom: "1px solid #1F2937",
              background:
                currentChat === chat.id
                  ? "#1E3A8A"
                  : "transparent",
            }}
          >
            <div
              onClick={() => setCurrentChat(chat.id)}
              style={{
                cursor: "pointer",
                fontWeight: "600",
                marginBottom: "10px",
              }}
            >
              {chat.pinned ? "📌 " : ""}
              {chat.title}
            </div>

            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              <button
                onClick={() => renameChat(chat.id)}
                style={{
                  flex: 1,
                  background: "#374151",
                  color: "white",
                  border: "none",
                  padding: "6px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                ✏
              </button>

              <button
                onClick={() => pinChat(chat.id)}
                style={{
                  flex: 1,
                  background: "#374151",
                  color: "white",
                  border: "none",
                  padding: "6px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                📌
              </button>

              <button
                onClick={() => deleteChat(chat.id)}
                style={{
                  flex: 1,
                  background: "#DC2626",
                  color: "white",
                  border: "none",
                  padding: "6px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatSidebar;