// utils/useChat.ts
import { useState } from "react";
import { Nebula } from "thirdweb/ai";
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
    secretKey: process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY || "",
});

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    try {
      const response = await Nebula.chat({
        client: client,
        message: message,
         });

      setMessages((prev) => [...prev, { role: "assistant", content: response.message }]);
    } catch (error) {
      console.error("Chat error:", error);
    }
    setLoading(false);
  };

  return { messages, sendMessage, loading };
};
