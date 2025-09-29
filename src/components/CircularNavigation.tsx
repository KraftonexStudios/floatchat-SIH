"use client";

import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useRouter } from 'next/navigation';

interface CircularNavigationProps {
  className?: string;
}

export function CircularNavigation({ className = '' }: CircularNavigationProps) {
  const { setIsFlowMode, setIsMapMode } = useApp();
  const router = useRouter();

  const handleFlowMode = () => {
    setIsFlowMode(true);
    setIsMapMode(false);
  };

  const handleMapMode = () => {
    setIsFlowMode(false);
    setIsMapMode(true);
  };

  const handleChatMode = () => {
    setIsFlowMode(false);
    setIsMapMode(false);
  };

  const navigationItems = [
    {
      id: 1,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      onClick: handleFlowMode,
      title: 'Flow Mode'
    },
    {
      id: 2,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      ),
      onClick: handleMapMode,
      title: 'Map View'
    },
    {
      id: 3,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      onClick: handleChatMode,
      title: 'Chat Mode'
    },
    {
      id: 4,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
        </svg>
      ),
      onClick: () => router.push('/dashboard'),
       title: 'Settings'
    }
  ];

  return (
    <div className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-50 ${className}`}>
      <div className="flex flex-col space-y-4">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className="w-12 h-12 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 shadow-lg"
            title={item.title}
          >
            {item.icon}
          </button>
        ))}
      </div>

    </div>
  );
}