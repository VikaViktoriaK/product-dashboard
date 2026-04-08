import { useState } from "react";

type Message = {
  id: number;
  text: string;
  sender: "me" | "other";
};

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "me",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        text: generateReply(newMessage.text),
        sender: "other",
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);

    setMessages((prev) => [
      ...prev,
      { id: Date.now() + 2, text: "Typing...", sender: "other" },
    ]);
  };

  const generateReply = (text: string): string => {
    const lower = text.toLowerCase();

    if (lower.includes("price")) {
      return "Hi, I think the price for this product is incorrect. Could you check?";
    }

    if (lower.includes("hello")) {
      return "Hello! I need some help with a product.";
    }

    if (lower.includes("stock")) {
      return "The product shows out of stock, but I was able to order it. Is that correct?";
    }

    if (lower.includes("order")) {
      return "I placed an order but haven't received any confirmation yet.";
    }

    if (lower.includes("bug")) {
      return "I think there is a bug on the product page.";
    }

    return "Hi, I have a question regarding one of your products.";
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Support Chat</h1>

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
