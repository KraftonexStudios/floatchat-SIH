"use client";

import { Search, MessageSquare, FolderOpen, Grid3X3, Settings, LayoutGrid } from "lucide-react";

interface SidebarProps {
  isFlowMode: boolean;
  onToggleMode: (mode: boolean) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isFlowMode, onToggleMode, isOpen, onToggle }: SidebarProps) {
  return (
    <div className={`${isOpen ? 'w-64' : 'w-0'} bg-neutral-950 border-r border-gray-800 flex flex-col transition-all duration-300 ease-in-out overflow-hidden `}>
      {/* Header */}
      <div className="p-4">
        <h1 className="text-xl font-semibold text-white">Floatchat</h1>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="px-4 mb-6">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">View Mode</h3>
        <div className="space-y-1">
          <button
            onClick={() => onToggleMode(false)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${!isFlowMode
              ? "bg-gray-800 text-white"
              : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat Mode</span>
          </button>
          <button
            onClick={() => onToggleMode(true)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isFlowMode
              ? "bg-gray-800 text-white"
              : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Flow Mode</span>
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

      {/* Chat History */}
      <div className="px-4 pb-4">
        <div className="text-xs text-gray-500 mb-2">Chats</div>
        <div className="space-y-1">
          <div className="text-sm text-gray-300 px-3 py-2 hover:bg-gray-800 rounded-lg cursor-pointer truncate">
            Create a artificial plane
          </div>
          <div className="text-sm text-gray-300 px-3 py-2 hover:bg-gray-800 rounded-lg cursor-pointer truncate">
            pokemon fight with pi...
          </div>
          <div className="text-sm text-gray-300 px-3 py-2 hover:bg-gray-800 rounded-lg cursor-pointer truncate flex items-center justify-between">
            how to merge git
            <span className="text-gray-500">•••</span>
          </div>
          <div className="text-sm text-gray-300 px-3 py-2 hover:bg-gray-800 rounded-lg cursor-pointer truncate">
            Create a artificial plane
          </div>
          <div className="text-sm text-gray-300 px-3 py-2 hover:bg-gray-800 rounded-lg cursor-pointer truncate">
            Create a artificial plane
          </div>
        </div>
      </div>
    </div>
  );
}