import { useState } from "react";
import { useChat } from "../hooks/useChat";

const ChatPage = () => {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();

  const handleSend = () => {
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Customer Support Chat</h1>

      <div className="border rounded p-3 h-80 overflow-y-auto mb-4 bg-gray-50">
        {messages.length === 0 && <p>No messages yet</p>}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded ${
                msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="border flex-1 px-3 py-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
