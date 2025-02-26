import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "../utils/useChat"; // Import the updated useChat
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

// Assume userAddress is passed as a prop or obtained dynamically
export const ChatLayout = ({ userAddress, isVoiceInput, toggleVoiceInput }) => {
  const { messages, sendMessage, loading } = useChat(userAddress);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-2xl p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">

      <CardContent>
        <ScrollArea className="h-80 border rounded p-3 bg-black bg-opacity-20 backdrop-blur-lg overflow-y-auto">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-3 my-2 rounded-lg shadow-md ${
                msg.role === "user"
                  ? "bg-blue-600 text-white self-end"
                  : "bg-gray-800 text-gray-200"
              }`}
            >
              {msg.content}
            </motion.div>
          ))}
          {loading && <p className="text-lg text-center text-blue-300 animate-pulse">🤖 Processing request...</p>}
        </ScrollArea>
        <div className="flex items-center mt-4 space-x-3">
          {isVoiceInput ? (
            <motion.div
              className="flex-grow flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <Button onClick={toggleVoiceInput} className="p-3 bg-pink-600 hover:bg-pink-700" title="Toggle Voice Input">
                <Mic className="w-6 h-6" />
              </Button>
            </motion.div>
          ) : (
            <>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-grow bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:border-pink-500 focus:ring-pink-500"
              />
              <Button onClick={handleSend} disabled={loading} title="Send Message" className="bg-indigo-600 hover:bg-indigo-700">
                Send
              </Button>
              <Button onClick={toggleVoiceInput} className="p-3 bg-pink-600 hover:bg-pink-700" title="Toggle Voice Input">
                <Mic className="w-6 h-6" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
