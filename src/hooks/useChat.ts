import { useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  text: string;
  sender: "me" | "client";
};

type ConnectionStatus =
  | "connecting"
  | "open"
  | "closing"
  | "closed"
  | "error";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("connecting");
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("wss://ws.ifelse.io");
    socketRef.current = socket;

    const handleOpen = () => {
      setConnectionStatus("open");
      setConnectionError(null);
    };

    const handleMessage = (e: MessageEvent) => {
      const clientMessage: Message = {
        id: Date.now(),
        text: String(e.data),
        sender: "client",
      };
      setMessages((prev) => [...prev, clientMessage]);
    };

    const handleClose = () => {
      setConnectionStatus("closed");
    };

    const handleError = () => {
      setConnectionStatus("error");
      setConnectionError("WebSocket connection error");
    };

    socket.addEventListener("open", handleOpen);
    socket.addEventListener("message", handleMessage);
    socket.addEventListener("close", handleClose);
    socket.addEventListener("error", handleError);

    return () => {
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("message", handleMessage);
      socket.removeEventListener("close", handleClose);
      socket.removeEventListener("error", handleError);

      setConnectionStatus("closing");
      if (
        socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING
      ) {
        socket.close();
      }

      if (socketRef.current === socket) {
        socketRef.current = null;
      }
    };
  }, []);

  const sendMessage = (text: string): boolean => {
    const trimmedText = text.trim();
    if (!trimmedText) return false;

    const socket = socketRef.current;
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      setConnectionError("Cannot send message while socket is not connected");
      return false;
    }

    const adminMessage: Message = {
      id: Date.now(),
      text: trimmedText,
      sender: "me",
    };

    setMessages((prev) => [...prev, adminMessage]);
    socket.send(trimmedText);
    return true;
  };

  return {
    messages,
    setMessages,
    sendMessage,
    connectionStatus,
    connectionError,
    isConnected: connectionStatus === "open",
  };
};
