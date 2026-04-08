import { useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  text: string;
  sender: "me" | "client";
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("wss://ws.ifelse.io");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Socket opened");
    };

    socket.onmessage = (e) => {
      const clientMessage: Message = {
        id: Date.now(),
        text: e.data,
        sender: "client",
      };
      setMessages((prev) => [...prev, clientMessage]);
    };

    socket.onclose = () => {
      console.log("Socket closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const adminMessage: Message = {
      id: Date.now(),
      text,
      sender: "me",
    };

    setMessages((prev) => [...prev, adminMessage]);

    socketRef.current?.send(text);
  };

  return { messages, setMessages, sendMessage };
};
