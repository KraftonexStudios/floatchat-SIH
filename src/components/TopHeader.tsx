"use client";

import { LayoutGrid, MessageSquare, Menu } from "lucide-react";

interface TopHeaderProps {
  isFlowMode: boolean;
  onToggleMode: (mode: boolean) => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function TopHeader({ isFlowMode, onToggleMode, isSidebarOpen, onToggleSidebar }: TopHeaderProps) {
  return (
    <div className="h-14 border-b   border-gray-800 flex items-center justify-between px-10 bg-black ">
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Menu size={20} className="text-gray-400 hover:text-white" />
        </button>
        <h1 className="text-lg font-semibold text-white">ARGO Data Analysis</h1>
      </div>

      <div className="flex items-center space-x-1">
        <div className="flex items-center bg-gray-900 rounded-lg p-1">
          <button
            onClick={() => onToggleMode(false)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${!isFlowMode
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:text-white"
              }`}
          >
            <MessageSquare size={16} />
          </button>
          <button
            onClick={() => onToggleMode(true)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isFlowMode
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:text-white"
              }`}
          >
            <LayoutGrid size={16} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">10/500</span>
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}