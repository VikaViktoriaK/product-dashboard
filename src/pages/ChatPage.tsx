import { useState, useEffect, useRef } from "react";
import { useChat } from "../hooks/useChat";

const ChatPage = () => {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="p-4 max-w-xl mx-auto h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Customer Support Chat</h1>

      <div className="flex-1 border rounded p-3 overflow-y-auto mb-4 bg-gray-50 shadow-inner">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 mt-10">No messages yet</p>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-3 flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-sm ${
                msg.sender === "me"
                  ? "bg-blue-500 text-white rounded-tr-none"
                  : "bg-white border text-gray-800 rounded-tl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 pb-4">
        <input
          className="border flex-1 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
