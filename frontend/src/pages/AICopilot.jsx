import { useEffect, useRef, useState } from "react";

import { askAI } from "../services/aiService";

import { downloadReport } from "../services/pdfService";

import ChatSidebar from "../components/ChatSidebar";
import ChatHeader from "../components/ChatHeader";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import InsightsPanel from "../components/InsightsPanel";
import SuggestedQuestions from "../components/SuggestedQuestions";

function AICopilot() {

  const filename =
    localStorage.getItem("uploadedFilename") ||
    "AI_Lead_Vision_Real_Estate_MIS_Copilot_PoC_12_Months.xlsx";

  const defaultMessage = {
  sender: "ai",
  text:
    "👋 Hello! I'm your MIS Analytics Copilot. Ask me anything about your dashboard.",
  time: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
};

  // -----------------------------
  // Chat Sessions
  // -----------------------------

  const [chats, setChats] = useState(() => {

    const saved =
      localStorage.getItem("copilotChats");

    if (saved) {
      return JSON.parse(saved);
    }

    return [
      {
        id: 1,
        title: "New Chat",
        messages: [defaultMessage],
      },
    ];

  });

  const [currentChat, setCurrentChat] =
    useState(chats[0].id);

  const [loading, setLoading] =
    useState(false);

  const chatEndRef =
    useRef(null);

  // -----------------------------
  // Save Chats
  // -----------------------------

  useEffect(() => {

    localStorage.setItem(
      "copilotChats",
      JSON.stringify(chats)
    );

  }, [chats]);

  // -----------------------------
  // Active Chat
  // -----------------------------

  const activeChat =
    chats.find(
      chat => chat.id === currentChat
    );

  const messages =
    activeChat?.messages || [];
    const latestAIMessage =
  [...messages]
    .reverse()
    .find((msg) => msg.sender === "ai");

  // -----------------------------
  // Auto Scroll
  // -----------------------------

  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);
    // -----------------------------
  // Create New Chat
  // -----------------------------

  function createChat() {

    const newChat = {
      id: Date.now(),
      title: `New Chat ${chats.length + 1}`,
      messages: [defaultMessage],
    };

    setChats(prev => [...prev, newChat]);

    setCurrentChat(newChat.id);
  }

  // -----------------------------
  // Update Current Chat
  // -----------------------------

  function updateCurrentChat(updatedMessages) {

    setChats(prev =>
      prev.map(chat =>
        chat.id === currentChat
          ? {
              ...chat,
              messages: updatedMessages,
            }
          : chat
      )
    );

  }

  // -----------------------------
  // Clear Current Chat
  // -----------------------------

  function clearChat() {

    const confirmClear = window.confirm(
      "Do you want to clear this conversation?"
    );

    if (!confirmClear) return;

    updateCurrentChat([defaultMessage]);

  }

  // -----------------------------
// Rename Chat
// -----------------------------

function renameChat(chatId) {
  const chat = chats.find((c) => c.id === chatId);

  if (!chat) return;

  const newTitle = window.prompt(
    "Enter new chat name:",
    chat.title
  );

  if (!newTitle || !newTitle.trim()) return;

  setChats((prev) =>
    prev.map((c) =>
      c.id === chatId
        ? {
            ...c,
            title: newTitle.trim(),
          }
        : c
    )
  );
}

// -----------------------------
// Delete Chat
// -----------------------------

function deleteChat(chatId) {

  if (chats.length === 1) {
    alert("At least one chat must exist.");
    return;
  }

  const confirmDelete = window.confirm(
    "Delete this conversation?"
  );

  if (!confirmDelete) return;

  const remainingChats = chats.filter(
    (chat) => chat.id !== chatId
  );

  setChats(remainingChats);

  if (currentChat === chatId) {
    setCurrentChat(remainingChats[0].id);
  }
}

// -----------------------------
// Pin Chat
// -----------------------------

function pinChat(chatId) {
  setChats((prev) =>
    prev.map((chat) =>
      chat.id === chatId
        ? {
            ...chat,
            pinned: !chat.pinned,
          }
        : chat
    )
  );
}

  // -----------------------------
  // Auto Rename Chat
  // -----------------------------

  useEffect(() => {

    setChats(prev =>
      prev.map(chat => {

        if (
          chat.id !== currentChat ||
          chat.messages.length < 2
        ) {
          return chat;
        }

        const firstQuestion =
          chat.messages.find(
            msg => msg.sender === "user"
          );

        if (!firstQuestion) {
          return chat;
        }

        return {
          ...chat,
          title:
            firstQuestion.text.length > 30
              ? firstQuestion.text.substring(0, 30) + "..."
              : firstQuestion.text,
        };

      })
    );

  }, [messages]);
    // -----------------------------
  // Ask AI
  // -----------------------------

  async function handleAsk(question) {

    if (!question.trim()) return;

    // User Message
    const userMessage = {
  sender: "user",
  text: question,
  time: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
};

    // Add user message immediately
    const updatedMessages = [
      ...messages,
      userMessage,
    ];

    updateCurrentChat(updatedMessages);

    setLoading(true);

    try {

      // Call FastAPI Backend
      const response = await askAI(
        filename,
        question
      );

      const aiMessage = {
  sender: "ai",
  text: response.answer,
  time: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
};

      updateCurrentChat([
        ...updatedMessages,
        aiMessage,
      ]);

    } catch (error) {

      console.error(error);

      const aiMessage = {
  sender: "ai",
  text: "❌ Unable to connect to AI Copilot.",
  time: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
};

      updateCurrentChat([
        ...updatedMessages,
        aiMessage,
      ]);

    } finally {

      setLoading(false);

    }

  }

  // -----------------------------
  // Scroll to Bottom
  // -----------------------------

  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);
    return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#F3F4F6",
      }}
    >
      {/* ================= Sidebar ================= */}

      <ChatSidebar
  chats={chats}
  currentChat={currentChat}
  setCurrentChat={setCurrentChat}
  createChat={createChat}
  renameChat={renameChat}
  deleteChat={deleteChat}
  pinChat={pinChat}
/>

      {/* ================= Main Content ================= */}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}

        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 15px",
  }}
>
  <ChatHeader clearChat={clearChat} />

  <button
    onClick={() =>
      handleAsk(
        "Generate a complete executive report. Include Executive Summary, KPI Summary, Key Insights, Risks, Recommendations and Action Items."
      )
    }
    style={{
      background: "#059669",
      color: "white",
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    📄 Executive Report
  </button>

  <button
  onClick={() => {
    if (latestAIMessage) {
      downloadReport(latestAIMessage.text);
    } else {
      alert("No AI report available to download.");
    }
  }}
  style={{
    marginLeft: "10px",
    background: "#2563EB",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  📥 Download PDF
</button>

</div>
        {/* Chat Window */}

        <div
  style={{
    flex: 1,
    overflowY: "auto",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
  }}
>

  <SuggestedQuestions
    onQuestionClick={handleAsk}
  />

  {messages.map((msg, index) => (

    <ChatBubble
  key={index}
  sender={msg.sender}
  text={msg.text}
  time={msg.time}
/>

  ))}

          {loading && (
  <ChatBubble
    sender="ai"
    text="🤖 AI is thinking..."
    time={new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}
  />
)}

          <div ref={chatEndRef}></div>

        </div>
                {/* ================= Chat Input ================= */}

        <ChatInput
  onSend={handleAsk}
/>

</div>

<InsightsPanel />

</div>
  );
}

export default AICopilot;