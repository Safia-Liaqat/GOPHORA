import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatAgent() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I’m GOPHORA AI. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock AI responses based on keywords
  const getMockAIResponse = (userInput) => {
    const text = userInput.toLowerCase();
    if (text.includes("ai")) {
      return "Here are some AI opportunities for you!";
    } else if (text.includes("design")) {
      return "Check out these design-focused opportunities!";
    } else {
      return "Interesting! Let me suggest some opportunities you might like.";
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const aiReply = getMockAIResponse(input);
      setMessages([...newMessages, { sender: "ai", text: aiReply }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0E1C] text-white">
      {/* Header */}
      <header className="p-4 text-center border-b border-[#1F254A]">
        <h1 className="text-xl font-bold text-[#A28EFF]">GOPHORA AI Chat</h1>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} sender={msg.sender} text={msg.text} />
        ))}
        {loading && (
          <p className="text-gray-400 text-sm italic">GOPHORA AI is typing...</p>
        )}
      </div>

      {/* Input */}
      <ChatInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onSend={handleSend}
        loading={loading}
      />
    </div>
  );
}
