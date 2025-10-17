import React from "react";

export default function ChatMessage({ sender, text }) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs p-3 rounded-2xl text-sm ${
          isUser
            ? "bg-[#A28EFF] text-white"
            : "bg-[#161B30] text-gray-200"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
