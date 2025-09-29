"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { AppProvider, useApp } from "@/contexts/AppContext";
import { Sidebar } from "@/components/Sidebar";
import { TopHeader } from "@/components/TopHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isFlowMode, setIsFlowMode, isMapMode, isSidebarOpen, setIsSidebarOpen } = useApp();

  // If in map mode, render children directly without layout wrapper
  if (isMapMode) {
    return (
      <div className="h-screen bg-black text-white overflow-hidden">
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <Sidebar
        isFlowMode={isFlowMode}
        onToggleMode={setIsFlowMode}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <TopHeader
          isFlowMode={isFlowMode}
          onToggleMode={setIsFlowMode}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <AppProvider>
          <LayoutContent>{children}</LayoutContent>
        </AppProvider>
      </body>
    </html>
  );
}
