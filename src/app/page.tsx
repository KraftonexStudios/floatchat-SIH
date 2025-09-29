"use client";

import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { ChatInterface } from "@/components/ChatInterface";
import FlowInterface from "@/components/FlowInterface";
import { MapInterface } from "@/components/MapInterface";
import { CircularNavigation } from "@/components/CircularNavigation";

export default function Home() {
  const { isFlowMode, isMapMode } = useApp();
  const [messages, setMessages] = useState<Array<{ id: string, content: string, isUser: boolean, timestamp: Date }>>([]);

  // Add sample data for testing flow interface
  const addSampleData = () => {
    const sampleMessages = [
      {
        id: "sample-1",
        content: "Tell me about ARGO float data in the Arabian Sea",
        isUser: true,
        timestamp: new Date(Date.now() - 2000)
      },
      {
        id: "sample-2",
        content: "Based on ARGO float data analysis, I can provide comprehensive temperature and salinity profiles. The data shows significant seasonal variations in the Arabian Sea during monsoon periods.",
        isUser: false,
        timestamp: new Date(Date.now() - 1000)
      }
    ];
    setMessages(sampleMessages);
  };

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
