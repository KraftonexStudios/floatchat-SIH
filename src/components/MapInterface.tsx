"use client";

import React, { useState, useEffect } from 'react';
import { Search, MessageSquare, FolderOpen, Grid3X3, Settings, LayoutGrid, Send, Mic, ArrowUp, Layers, Moon, Sun, MapPin, Navigation, Compass } from "lucide-react";
import { WorldMap } from './WorldMapDraggable';
import { CircularNavigation } from './CircularNavigation';
import { useApp } from '@/contexts/AppContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface MapInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export function MapInterface({ messages, onSendMessage }: MapInterfaceProps) {
  const { setIsFlowMode, setIsMapMode } = useApp();
  const [inputMessage, setInputMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetContent, setSheetContent] = useState({ title: '', description: '', data: '' });

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage.trim());

      // Check if the message is map-related and open sheet with static response
      const mapKeywords = ['map', 'location', 'float', 'ocean', 'coordinate', 'position', 'navigation', 'argo', 'latitude', 'longitude', 'region', 'area'];
      const isMapRelated = mapKeywords.some(keyword => inputMessage.toLowerCase().includes(keyword));

      if (isMapRelated) {
        setSheetContent({
          title: 'Query Response',
          description: 'Your question and our analysis',
          data: `**Your Query:** "${inputMessage}"\n\n**Analysis Response:**\n${generateStaticMapResponse(inputMessage)}`
        });
        setIsSheetOpen(true);
      }

      setInputMessage('');
    }
  };



  const generateStaticMapResponse = (query: string) => {
    const responses = {
      default: `Based on your query "${query}", here are the current map insights:\n\n🌊 **Ocean Data Summary:**\n• Total Active ARGO Floats: 1,247\n• Coverage Area: Indian Ocean Region\n• Data Collection Points: 73 active locations\n\n📍 **Key Locations:**\n• Mumbai Coastal Region: 15 floats\n• Arabian Sea: 28 floats\n• Bay of Bengal: 30 floats\n\n📊 **Recent Measurements:**\n• Average Temperature: 28.5°C\n• Salinity Levels: 34.2 PSU\n• Data Freshness: Last updated 2 hours ago\n\n🔍 **Recommendations:**\n• Focus on Arabian Sea region for detailed analysis\n• Monitor temperature variations in coastal areas\n• Check maintenance schedule for 23 floats`,
      location: `📍 **Location Analysis:**\n\nBased on current float positions:\n• Highest density: Mumbai coastal waters\n• Sparse coverage: Deep ocean regions\n• Optimal monitoring: 40km radius from major ports\n\n**Coordinate Ranges:**\n• Latitude: 8°N to 28°N\n• Longitude: 68°E to 88°E\n\n**Navigation Notes:**\n• Safe zones identified for research vessels\n• Weather-dependent access to 12 locations\n• Real-time tracking available for all active floats`,
      data: `📊 **Data Insights:**\n\n**Temperature Trends:**\n• Surface: 28-30°C\n• 100m depth: 24-26°C\n• 500m depth: 18-20°C\n\n**Salinity Patterns:**\n• Coastal: 33.5-34.0 PSU\n• Open ocean: 34.2-34.8 PSU\n• Monsoon impact: -0.5 PSU variation\n\n**Quality Metrics:**\n• Data accuracy: 99.2%\n• Transmission success: 97.8%\n• Sensor calibration: Within specs`
    };

    if (query.toLowerCase().includes('location') || query.toLowerCase().includes('position') || query.toLowerCase().includes('coordinate')) {
      return responses.location;
    } else if (query.toLowerCase().includes('data') || query.toLowerCase().includes('temperature') || query.toLowerCase().includes('salinity')) {
      return responses.data;
    }
    return responses.default;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBackToFlow = () => {
    setIsFlowMode(true);
    setIsMapMode(false);
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Left Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-300 ease-in-out overflow-hidden`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-semibold text-white">Map View</h1>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search locations"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="px-4 mb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">View Mode</h3>
          <div className="space-y-1">
            <button
              onClick={() => {
                setIsFlowMode(false);
                setIsMapMode(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat Mode</span>
            </button>
            <button
              onClick={handleBackToFlow}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Flow Mode</span>
            </button>
            <button
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-800 text-white"
            >
              <Grid3X3 className="w-4 h-4" />
              <span>Map View</span>
            </button>
          </div>
        </div>



        {/* Navigation */}
        <nav className="flex-1 px-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg cursor-pointer">
              <FolderOpen className="w-4 h-4" />
              <span className="text-sm">My Research</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg cursor-pointer">
              <Grid3X3 className="w-4 h-4" />
              <span className="text-sm">Template</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg cursor-pointer">
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </div>
          </div>
        </nav>

        {/* Recent Locations */}
        <div className="px-4 pb-4">
          <div className="text-xs text-gray-500 mb-2">Recent Locations</div>
          <div className="space-y-1">
            <div className="text-sm text-gray-300 px-3 py-2 hover:bg-gray-800 rounded-lg cursor-pointer truncate">
              Arabian Sea
            </div>
            <div className="text-sm text-gray-300 px-3 py-2 hover:bg-gray-800 rounded-lg cursor-pointer truncate">
              Bay of Bengal
            </div>
            <div className="text-sm text-gray-300 px-3 py-2 hover:bg-gray-800 rounded-lg cursor-pointer truncate">
              Indian Ocean
            </div>
            <div className="text-sm text-gray-300 px-3 py-2 hover:bg-gray-800 rounded-lg cursor-pointer truncate">
              Pacific Ocean
            </div>
          </div>
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <div className="bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-400 hover:text-white"
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-white">Global Ocean Monitoring</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Real-time Data</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          {/* Map - Base Layer */}
          <div className="absolute inset-0 z-0">
            <WorldMap darkMode={isDarkMode} />
          </div>

          {/* Map Layer Controls */}
          <div className="absolute top-20 left-2 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-4 z-10">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-white" />
              <h4 className="text-white font-semibold text-sm">Map Layers</h4>
            </div>
            <div className="space-y-2 mb-4">
              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>ARGO Floats</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Temperature Data</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Salinity Data</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span>Ocean Currents</span>
              </label>
            </div>

            {/* Dark Mode Toggle */}
            <div className="border-t border-gray-600 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Dark Mode</span>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                >
                  {isDarkMode ? (
                    <>
                      <Moon className="w-3 h-3" />
                      <span>Dark</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-3 h-3" />
                      <span>Light</span>
                    </>
                  )}
                </button>
              </div>
              

            </div>
          </div>

          {/* Map Overlay Info */}
          <div className="absolute top-4 right-20 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-4 max-w-sm z-10">
            <h3 className="text-white font-semibold mb-2">Active Floats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Total Active:</span>
                <span className="text-green-400">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Maintenance:</span>
                <span className="text-yellow-400">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Inactive:</span>
                <span className="text-red-400">15</span>
              </div>
            </div>
          </div>

          {/* Circular Navigation */}
          <CircularNavigation className="z-20" />
        </div>

        {/* Right Side Sheet for Map Queries */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-gray-900 border-gray-700">
            <SheetHeader>
              <SheetTitle className="text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-400" />
                {sheetContent.title}
              </SheetTitle>
              <SheetDescription className="text-gray-300">
                {sheetContent.description}
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-4">
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  <h3 className="text-white font-semibold text-sm">Query & Response</h3>
                </div>
                <div className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">
                  {sheetContent.data}
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Navigation className="w-4 h-4 text-blue-400" />
                  <h3 className="text-white font-semibold text-sm">Quick Actions</h3>
                </div>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors">
                    📊 View Detailed Charts
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors">
                    📍 Export Location Data
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors">
                    🔄 Refresh Real-time Data
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors">
                    📋 Generate Report
                  </button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Bottom Input Area */}
        <div className="bg-gray-900 border-t border-gray-800 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about ocean data, float locations, or analysis..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-4 pr-20 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}