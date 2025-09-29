"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useApp } from "@/contexts/AppContext";
import { ChatInterface } from "@/components/ChatInterface";
import { CircularNavigation } from "@/components/CircularNavigation";

// Dynamically import FlowInterface with SSR disabled
const FlowInterface = dynamic(() => import("@/components/FlowInterface"), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-screen bg-black text-white">Loading Flow Interface...</div>
});

// Dynamically import MapInterface with SSR disabled
const MapInterface = dynamic(() => import("@/components/MapInterface").then(mod => ({ default: mod.MapInterface })), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-screen bg-black text-white">Loading Map Interface...</div>
});

export default function Home() {
  const { isFlowMode, isMapMode } = useApp();
  const [messages, setMessages] = useState<Array<{ id: string, content: string, isUser: boolean, timestamp: Date }>>([]);



  const handleSendMessage = async (content: string) => {
    const userMessage = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(content),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userInput: string) => {
    return "Based on ARGO float data analysis, I can provide comprehensive temperature and salinity profiles. The data shows significant seasonal variations in the Arabian Sea during monsoon periods.";
  };

  return (
    <>
      {isMapMode ? (
        <MapInterface messages={messages} onSendMessage={handleSendMessage} />
      ) : isFlowMode ? (
        <FlowInterface messages={messages} onSendMessage={handleSendMessage} />
      ) : (
        <ChatInterface messages={messages} onSendMessage={handleSendMessage} />
      )}
      {!isMapMode && <CircularNavigation />}
    </>
  );
}
