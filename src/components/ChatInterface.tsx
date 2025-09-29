"use client";

import { useState } from "react";
import { Send, Mic, ArrowUp, MoreHorizontal, Download, Copy, RotateCcw } from "lucide-react";
import { TemperatureChart } from "./TemperatureChart";
import { SalinityChart } from "./SalinityChart";
import { WorldMap } from "./WorldMap";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export function ChatInterface({ messages, onSendMessage }: ChatInterfaceProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}


      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Start a conversation by typing a message below...</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`mb-6 ${msg.isUser ? 'ml-auto' : 'mr-auto'}`}>
                {msg.isUser ? (
                  <div className="p-4 bg-gray-800 rounded-lg max-w-2xl ml-auto">
                    <p className="text-white text-sm">{msg.content}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-2 rounded-lg mb-4">
                      <p className="text-white text-md">{msg.content}</p>
                    </div>

                    {/* Show charts only for ARGO-related responses */}
                    {msg.content.toLowerCase().includes('argo') && (
                      <>
                        {/* Charts Section */}
                        <div className="grid grid-cols-2 gap-6">
                          <TemperatureChart />
                          <SalinityChart />
                        </div>

                        {/* World Map */}
                        <div className="bg-gray-900 rounded-lg p-4">
                          <WorldMap />
                        </div>

                        {/* Key Findings */}
                        <div className=" rounded-lg p-6">
                          <h3 className="text-white font-semibold mb-4">Key Findings:</h3>
                          <ul className="space-y-2 text-gray-300 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400">•</span>
                              <span><strong>Monsoon Impact:</strong> Mixed layer depth increased from 25m (pre-monsoon) to 65m (peak monsoon) due to strong surface cooling and mixing</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400">•</span>
                              <span><strong>Temperature Anomaly:</strong> Surface temperatures were 0.8°C cooler than 2010-2020 climatology, indicating stronger upwelling</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400">•</span>
                              <span><strong>Salinity Patterns:</strong> Fresh water intrusion detected in northern regions (34.2-34.8 PSU) from increased precipitation</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400">•</span>
                              <span><strong>Subsurface Features:</strong> Persian Gulf Water mass clearly identified at 200-300m depth with high salinity (&gt;36.5 PSU)</span>
                            </li>
                          </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                            <Download className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                            <Copy className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                            <RotateCcw className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Input */}
      <div className="px-24 p-2   border-gray-800">
        <div className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything"
            className="w-full bg-gray-800 border border-gray-700 rounded-full pl-4 pr-20 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && message.trim()) {
                onSendMessage(message.trim());
                setMessage('');
              }
            }}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <Mic className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => {
                if (message.trim()) {
                  onSendMessage(message.trim());
                  setMessage('');
                }
              }}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
            >
              <ArrowUp className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}