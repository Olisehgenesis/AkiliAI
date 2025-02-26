import { useState, useEffect } from "react";
import { receiveMessage } from "../lib/agent/src/entry";

export const useChat = (walletAddress: string) => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);

  // Fetch the thread ID for the user, or create one if none exists
  useEffect(() => {
    if (walletAddress) {
      setThreadId(walletAddress); // Assume threadId is wallet address for simplicity
    }
  }, [walletAddress]);

  const sendMessage = async (message: string) => {
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    try {
      // Get assistant response
      const response = await receiveMessage(message);

      if (response) {
        setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      }
    } catch (error) {
      console.error("Error handling message:", error);
    }

    setLoading(false);
  };

  return { messages, sendMessage, loading };
};
