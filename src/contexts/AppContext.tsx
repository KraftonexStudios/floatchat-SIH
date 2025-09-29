"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  isFlowMode: boolean;
  setIsFlowMode: (mode: boolean) => void;
  isMapMode: boolean;
  setIsMapMode: (mode: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isFlowMode, setIsFlowMode] = useState(false);
  const [isMapMode, setIsMapMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <AppContext.Provider value={{
      isFlowMode,
      setIsFlowMode,
      isMapMode,
      setIsMapMode,
      isSidebarOpen,
      setIsSidebarOpen
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}